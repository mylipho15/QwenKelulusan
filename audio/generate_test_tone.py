#!/usr/bin/env python3
"""
Generate a simple test tone as MP3-like WAV file for testing HTML5 audio
"""
import wave
import struct
import math

# Audio parameters
sample_rate = 44100
duration = 3  # seconds
frequency = 440  # Hz (A4 note)
volume = 0.3

# Generate samples
num_samples = int(sample_rate * duration)
samples = []

for i in range(num_samples):
    t = i / sample_rate
    # Generate sine wave
    value = volume * math.sin(2 * math.pi * frequency * t)
    # Convert to 16-bit integer
    samples.append(int(value * 32767))

# Write WAV file (browsers support WAV too!)
with wave.open('/workspace/audio/test_tone.wav', 'w') as wav_file:
    wav_file.setnchannels(1)  # Mono
    wav_file.setsampwidth(2)  # 16-bit
    wav_file.setframerate(sample_rate)
    for sample in samples:
        wav_file.writeframes(struct.pack('<h', sample))

print("✅ Generated test_tone.wav (3 second 440Hz tone)")
print("📁 File: /workspace/audio/test_tone.wav")

# Also create an HTML file that uses WAV
html_content = """<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Test Audio dengan WAV</title>
</head>
<body>
    <h1>🎵 Test Audio Player - WAV Format</h1>
    <audio id="bgMusic" loop preload="auto">
        <source src="test_tone.wav" type="audio/wav">
        Your browser does not support audio.
    </audio>
    <button onclick="document.getElementById('bgMusic').play()">▶️ Play</button>
    <button onclick="document.getElementById('bgMusic').pause()">⏸️ Pause</button>
    <p>File WAV lebih mudah di-generate dan didukung semua browser modern!</p>
</body>
</html>
"""

with open('/workspace/test_audio_wav.html', 'w') as f:
    f.write(html_content)

print("✅ Generated test_audio_wav.html")
