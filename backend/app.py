

from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId
import os, subprocess, signal

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "your mogo url"
mongo = PyMongo(app)

STREAM_FOLDER = "stream"
ffmpeg_process = None

# ---------- STREAM ----------
@app.route("/stream/<path:filename>")
def stream_file(filename):
    response = make_response(send_from_directory(STREAM_FOLDER, filename))
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Range")
    response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
    return response


# ---------- START RTSP STREAM ----------
@app.route("/start-stream", methods=["POST"])
def start_stream():
    global ffmpeg_process
    data = request.json
    rtsp_url = data.get("rtspUrl")

    if not rtsp_url:
        return jsonify({"error": "RTSP URL required"}), 400

    # stop old ffmpeg if running
    if ffmpeg_process:
        ffmpeg_process.kill()

    os.makedirs(STREAM_FOLDER, exist_ok=True)

    cmd = [
        "ffmpeg",
        "-rtsp_transport", "tcp",
        "-i", rtsp_url,
        "-f", "hls",
        "-hls_time", "2",
        "-hls_list_size", "5",
        "-hls_flags", "delete_segments",
        f"{STREAM_FOLDER}/stream.m3u8"
    ]

    ffmpeg_process = subprocess.Popen(cmd)

    return jsonify({
        "message": "RTSP stream started",
        "playUrl": "http://localhost:5000/stream/stream.m3u8"
    })


# ---------- CRUD APIs ----------
@app.route("/overlays", methods=["GET"])
def get_overlays():
    overlays = []
    for o in mongo.db.overlays.find():
        o["_id"] = str(o["_id"])
        overlays.append(o)
    return jsonify(overlays)


@app.route("/overlays", methods=["POST"])
def create_overlay():
    data = request.json
    overlay = {
        "type": data.get("type"),
        "content": data.get("content"),
        "x": data.get("x", 50),
        "y": data.get("y", 50),
        "width": data.get("width", 120),
        "height": data.get("height", 50),
    }
    result = mongo.db.overlays.insert_one(overlay)
    overlay["_id"] = str(result.inserted_id)
    return jsonify(overlay)


@app.route("/overlays/<id>", methods=["PUT"])
def update_overlay(id):
    data = request.json
    data.pop("_id", None)
    mongo.db.overlays.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"message": "updated"})


@app.route("/overlays/<id>", methods=["DELETE"])
def delete_overlay(id):
    mongo.db.overlays.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "deleted"})


if __name__ == "__main__":
    os.makedirs(STREAM_FOLDER, exist_ok=True)
    app.run(debug=True, port=5000)
