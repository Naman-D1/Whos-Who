v0.1: OpenCV Background Subtraction & Heuristic FiltersCurrent Iteration: Uses MOG2 background subtraction and hand-tuned heuristics (aspect-ratio, circular variance) with a simulated Heavy AI stub.⚙️ How it works

**[ Video frame ]**

=========================================
 STAGE 1: Motion detection
=========================================
 Gaussian blur 
  → MOG2 background subtraction 
  → shadow removal
  → morphological open + dilate 
  → contour boxes (small blobs dropped)

 
=========================================
 Tracking
=========================================
 One-to-one nearest-centroid matching
 (tracks expire after 10 missed frames)


=========================================
 STAGE 2: Motion heuristics 
=========================================
 (Evaluated per track, over recent frames)
 • Aspect-ratio fluctuation (coefficient of variation)
 • Optical-flow direction scatter (circular variance)
 • Trajectory jitter (normalised by box size)
 → Classified as "agent-like" or "noise-like"



=========================================
 STAGE 3: Heavy AI (simulated)
=========================================
 Runs only after a track passes Stage 2 
 for 3 consecutive frames, then cached 
 and refreshed every 15 frames per track.
The primary goal is to minimise heavy-AI calls while still catching every real person.📋 RequirementsPython 3.8+opencv-pythonnumpypip install opencv-python numpy
🚀 Usagepython edge_motion_filter.py your_video.mp4
FlagDescriptionDefault--width NProcessing width in pixels. Lower is faster.640--warmup NFrames for the background model to learn before detection starts.60--save out.mp4Write the annotated video to a file.off--no-displayRun without a window and print progress to the console.off--realtimeThrottle playback to the video's own FPS.off (max speed)Examples:# Watch it live
python edge_motion_filter.py hallway.mp4

# Headless run that saves an annotated demo clip
python edge_motion_filter.py hallway.mp4 --no-display --save demo_out.mp4

# Lighter processing for a slower machine
python edge_motion_filter.py hallway.mp4 --width 480
Controls: q quits, Space pauses.📊

**Reading the OutputBox:**
Colour:          Meaning:
🟩 Green         Passed 

Stage 2;
(The heavy AI has been woken for this track)
🟨 Yellow        Looks agent-like, but hasn't yet passed 3 frames in a row
🟥 Red           Filtered out as noise or debris

The top-left overlay shows heavy-AI calls versus frames processed and the current pipeline FPS. When the run ends, a summary prints the total frames, heavy calls, the percentage of frames that triggered a call, and the average speed.

**💡 Tips for Good Demo Footage**
Use a fixed camera. 
Background subtraction assumes a static scene, so shaky or panning footage will confuse it.
The most convincing clips have a person and non-human motion in the same scene, such as someone walking past a blowing plastic bag or leaves.
Let the first ~2 seconds be mostly empty if you can. The warm-up period is used to learn the background.
A person who stands completely still will eventually be absorbed into the background and lose their box. This is a known limitation of MOG2.

**🎛️ Tuning**
The Stage 2 thresholds live in EdgeMotionFilter.looks_like_agent:ThresholdMeaningLoosen if...ar_cv > 0.30Aspect-ratio variation.
People with swinging arms are marked as noisecirc_var > 0.75F low direction scatter (0 = coherent, 1 = random). Real people get red boxestraj_instab > 0.06.
Trajectory jitter relative to box size. Tracks flicker between red and green. Other knobs in the EdgeMotionFilter constructor: wake_streak (consecutive passes before waking the heavy model), heavy_refresh (frames between re-runs per track), max_missed, match_dist_frac, and min_area_frac.

*Note:* These values are hand-picked starting points, not validated numbers. Expect to adjust them for your footage.

**⚠️ Known Limitations**
The heuristics are probabalitic. Walking humans have swinging limbs and can look less rigid than a sliding box, so the rules may rarely reject real people.
Stationary people fade out as MOG2 absorbs them into the background.
No camera-motion compensation.
The heavy AI is a stub. 
heavy_ai_inference sleeps for 20 ms and returns "Human/Child". It doesn't actually classify anything yet. 

**We are aiming to eliminate most of these limitations in future versions/updates**
