import { useState, useRef } from "react";

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
    };

    const takePhoto = () => {
        const canvas = document.createElement("canvas");
        const video = videoRef.current;
        if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d")?.drawImage(video, 0, 0);
            setPhoto(canvas.toDataURL("image/png"));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Take a Photo</h1>
            {!photo ? (
                <>
                    <video ref={videoRef} autoPlay className="w-96 h-64 bg-black"></video>
                    <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={startCamera}>
                        Start Camera
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={takePhoto}>
                        Capture 📸
                    </button>
                </>
            ) : (
                <>
                    <img src={photo} alt="Captured" className="w-96 h-64" />
                    <button className="bg-red-500 text-white px-4 py-2 mt-2" onClick={() => setPhoto(null)}>
                        Retake 🔄
                    </button>
                </>
            )}
        </div>
    );
}
