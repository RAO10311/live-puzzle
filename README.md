I wanted to see how far I could get with hand tracking in the browser without any backend, so I built a puzzle game you play with your hands. You hold both hands up to make a frame, pinch to snap a photo of whatever is inside it, and the picture gets cut into tiles and shuffled. Then you pick tiles up with a pinch and drag them around to swap them back into place. The clock runs the whole time, and your best times go on a leaderboard.

You can choose a 3x3, 4x4 or 6x6 grid, and if you don’t feel like waving your hands around, the mouse works too.

MediaPipe Hands finds the hand landmarks. The rest I wrote myself: pinch detection from the distance between thumb and index finger, smoothing so dragging doesn’t jitter, the shuffle and swap logic, and the leaderboard. Everything runs in your browser, so no video ever leaves your device.

Try it here: your live link:https://kashish995.github.io/live-puzzle/
