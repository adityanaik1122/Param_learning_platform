export const phase8ComputerVisionContent = {
  id: 8,
  title: 'Phase 8: Computer Vision',
  topics: [
    'Image Fundamentals & OpenCV Basics',
    'Image Transformations & Filtering',
    'Edge Detection & Feature Extraction',
    'Object Detection (YOLO, R-CNN)',
    'Image Segmentation (Semantic, Instance, Panoptic)',
    'Face Detection & Recognition',
    'Pose Estimation & Tracking',
    'Optical Flow & Motion Analysis',
    '3D Vision & Depth Estimation',
    'Video Analysis & Action Recognition',
    'GANs for Image Generation',
    'Style Transfer & Image Enhancement',
    'Image Captioning & Visual QA',
    'OCR & Document Analysis',
    'Medical Image Analysis',
    'Autonomous Vehicles & Scene Understanding',
    'Real-Time CV Applications',
    'Advanced Topics (NeRF, SAM, Vision Transformers)'
  ],
  lessons: [
    {
      title: 'Image Fundamentals & OpenCV Basics',
      description: `
## Image Fundamentals & OpenCV

### Overview
Computer vision begins with understanding digital images as numerical arrays. OpenCV (Open Source Computer Vision Library) is the most widely used library for CV tasks, providing 2500+ optimized algorithms.

### Key Concepts

**Digital Images**:
- Pixels: Smallest unit of an image
- Grayscale: Single channel (0-255)
- RGB: Three channels (Red, Green, Blue)
- Image shape: (height, width, channels)
- Coordinate system: Origin at top-left

**Color Spaces**:
- RGB: Red, Green, Blue (display)
- BGR: Blue, Green, Red (OpenCV default)
- HSV: Hue, Saturation, Value (color detection)
- Grayscale: Single intensity value

**Basic Operations**:
- Reading/writing images
- Resizing and cropping
- Color space conversion
- Drawing shapes and text
- Image arithmetic

**OpenCV Installation**:
\`\`\`bash
pip install opencv-python opencv-contrib-python
\`\`\`

### Problem Statement
1. Load and display images with OpenCV
2. Convert between color spaces
3. Perform basic image operations
4. Draw annotations on images
5. Create image collages

### Expected Output
- Loaded and processed images
- Color space conversions
- Annotated images with shapes and text
`,
      starterCode: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# TODO: Load image
img = cv2.imread('sample.jpg')  # Replace with actual image path

# TODO: Convert BGR to RGB (OpenCV uses BGR by default)
img_rgb = 

# TODO: Convert to grayscale
img_gray = 

# TODO: Get image properties
height, width, channels = 
print(f"Image shape: {height}x{width}x{channels}")

# TODO: Resize image
resized = cv2.resize(img_rgb, (, ))

# TODO: Crop image (center crop)
center_x, center_y = width // 2, height // 2
crop_size = 200
cropped = img_rgb[
    center_y - crop_size:center_y + crop_size,
    center_x - crop_size:center_x + crop_size
]

# TODO: Draw rectangle and text
annotated = img_rgb.copy()
cv2.rectangle(annotated, (50, 50), (200, 200), (255, 0, 0), 3)
cv2.putText(annotated, 'OpenCV', (60, 100), 
            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

# Display results
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes[0, 0].imshow(img_rgb)
axes[0, 0].set_title('Original')
axes[0, 1].imshow(img_gray, cmap='gray')
axes[0, 1].set_title('Grayscale')
axes[0, 2].imshow(resized)
axes[0, 2].set_title('Resized')
axes[1, 0].imshow(cropped)
axes[1, 0].set_title('Cropped')
axes[1, 1].imshow(annotated)
axes[1, 1].set_title('Annotated')

for ax in axes.flat:
    ax.axis('off')
plt.tight_layout()
plt.show()
`,
      solution: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Create sample image (since we don't have actual file)
img = np.random.randint(0, 255, (400, 600, 3), dtype=np.uint8)

# Convert BGR to RGB
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Convert to grayscale
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Get image properties
height, width, channels = img.shape
print(f"Image shape: {height}x{width}x{channels}")

# Resize image
resized = cv2.resize(img_rgb, (300, 200))

# Crop image (center crop)
center_x, center_y = width // 2, height // 2
crop_size = 100
cropped = img_rgb[
    center_y - crop_size:center_y + crop_size,
    center_x - crop_size:center_x + crop_size
]

# Draw rectangle and text
annotated = img_rgb.copy()
cv2.rectangle(annotated, (50, 50), (200, 200), (255, 0, 0), 3)
cv2.putText(annotated, 'OpenCV', (60, 100), 
            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
cv2.circle(annotated, (300, 200), 50, (0, 255, 0), -1)

# Display results
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes[0, 0].imshow(img_rgb)
axes[0, 0].set_title('Original (400x600)')
axes[0, 1].imshow(img_gray, cmap='gray')
axes[0, 1].set_title('Grayscale')
axes[0, 2].imshow(resized)
axes[0, 2].set_title('Resized (300x200)')
axes[1, 0].imshow(cropped)
axes[1, 0].set_title('Cropped (200x200)')
axes[1, 1].imshow(annotated)
axes[1, 1].set_title('Annotated')

# Color space comparison
img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
axes[1, 2].imshow(img_hsv)
axes[1, 2].set_title('HSV Color Space')

for ax in axes.flat:
    ax.axis('off')
plt.tight_layout()
plt.show()

print("\\nOpenCV Basics:")
print("- Images are NumPy arrays")
print("- OpenCV uses BGR, matplotlib uses RGB")
print("- Shape: (height, width, channels)")
print("- Pixel values: 0-255 for uint8")
`,
      code: `import cv2
import numpy as np

# Create sample image
img = np.random.randint(0, 255, (400, 600, 3), dtype=np.uint8)

# Convert BGR to RGB
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Convert to grayscale
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Image properties
height, width, channels = img.shape
print(f"Shape: {height}x{width}x{channels}")

# Resize
resized = cv2.resize(img_rgb, (300, 200))
print(f"Resized: {resized.shape}")

# Crop center
center_x, center_y = width // 2, height // 2
crop_size = 100
cropped = img_rgb[center_y-crop_size:center_y+crop_size, 
                  center_x-crop_size:center_x+crop_size]
print(f"Cropped: {cropped.shape}")

# Draw annotations
annotated = img_rgb.copy()
cv2.rectangle(annotated, (50, 50), (200, 200), (255, 0, 0), 3)
cv2.putText(annotated, 'OpenCV', (60, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

print("OpenCV operations completed successfully!")
`
    },
    {
      title: 'Image Transformations & Filtering',
      description: `
## Image Transformations & Filtering

### Overview
Image transformations modify the spatial arrangement of pixels, while filtering applies mathematical operations to enhance or extract features. These are fundamental preprocessing steps in computer vision pipelines.

### Key Concepts

**Geometric Transformations**:
- Translation: Shifting image position
- Rotation: Rotating around a point
- Scaling: Changing image size
- Affine: Preserves parallel lines
- Perspective: 3D-like transformations

**Image Filtering**:
- Convolution: Sliding kernel operation
- Blurring: Smoothing (Gaussian, median, bilateral)
- Sharpening: Enhancing edges
- Noise reduction: Removing artifacts

**Kernel/Filter Types**:
- Gaussian: Smooth blurring
- Box: Average blurring
- Median: Salt-and-pepper noise removal
- Bilateral: Edge-preserving smoothing

**Applications**:
- Image preprocessing
- Noise reduction
- Feature enhancement
- Data augmentation

### Problem Statement
1. Apply geometric transformations
2. Implement various filters
3. Compare filtering techniques
4. Create custom kernels
5. Build image augmentation pipeline

### Expected Output
- Transformed images
- Filtered images with different kernels
- Comparison of filtering methods
`,
      starterCode: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Create sample image with noise
img = np.random.randint(100, 200, (300, 300, 3), dtype=np.uint8)
# Add salt and pepper noise
noise = np.random.randint(0, 2, (300, 300, 3)) * 255
noisy_img = np.clip(img + noise * 0.1, 0, 255).astype(np.uint8)

# TODO: Rotation
center = (img.shape[1] // 2, img.shape[0] // 2)
rotation_matrix = cv2.getRotationMatrix2D(center, , )
rotated = cv2.warpAffine(img, rotation_matrix, (img.shape[1], img.shape[0]))

# TODO: Translation
tx, ty = 50, 30
translation_matrix = np.float32([[1, 0, tx], [0, 1, ty]])
translated = 

# TODO: Gaussian Blur
gaussian_blur = cv2.GaussianBlur(noisy_img, (, ), )

# TODO: Median Blur (good for salt-and-pepper noise)
median_blur = 

# TODO: Bilateral Filter (edge-preserving)
bilateral = cv2.bilateralFilter(noisy_img, , , )

# TODO: Custom sharpening kernel
sharpen_kernel = np.array([
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
])
sharpened = cv2.filter2D(img, -1, sharpen_kernel)

# Display results
fig, axes = plt.subplots(2, 4, figsize=(16, 8))
axes[0, 0].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
axes[0, 0].set_title('Original')
axes[0, 1].imshow(cv2.cvtColor(rotated, cv2.COLOR_BGR2RGB))
axes[0, 1].set_title('Rotated 45°')
axes[0, 2].imshow(cv2.cvtColor(translated, cv2.COLOR_BGR2RGB))
axes[0, 2].set_title('Translated')
axes[0, 3].imshow(cv2.cvtColor(noisy_img, cv2.COLOR_BGR2RGB))
axes[0, 3].set_title('Noisy')

axes[1, 0].imshow(cv2.cvtColor(gaussian_blur, cv2.COLOR_BGR2RGB))
axes[1, 0].set_title('Gaussian Blur')
axes[1, 1].imshow(cv2.cvtColor(median_blur, cv2.COLOR_BGR2RGB))
axes[1, 1].set_title('Median Blur')
axes[1, 2].imshow(cv2.cvtColor(bilateral, cv2.COLOR_BGR2RGB))
axes[1, 2].set_title('Bilateral Filter')
axes[1, 3].imshow(cv2.cvtColor(sharpened, cv2.COLOR_BGR2RGB))
axes[1, 3].set_title('Sharpened')

for ax in axes.flat:
    ax.axis('off')
plt.tight_layout()
plt.show()
`,
      solution: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Create sample image
img = np.random.randint(100, 200, (300, 300, 3), dtype=np.uint8)
# Add noise
noise = np.random.randint(0, 2, (300, 300, 3)) * 255
noisy_img = np.clip(img + noise * 0.1, 0, 255).astype(np.uint8)

# Rotation
center = (img.shape[1] // 2, img.shape[0] // 2)
rotation_matrix = cv2.getRotationMatrix2D(center, 45, 1.0)
rotated = cv2.warpAffine(img, rotation_matrix, (img.shape[1], img.shape[0]))

# Translation
tx, ty = 50, 30
translation_matrix = np.float32([[1, 0, tx], [0, 1, ty]])
translated = cv2.warpAffine(img, translation_matrix, (img.shape[1], img.shape[0]))

# Gaussian Blur
gaussian_blur = cv2.GaussianBlur(noisy_img, (5, 5), 0)

# Median Blur
median_blur = cv2.medianBlur(noisy_img, 5)

# Bilateral Filter
bilateral = cv2.bilateralFilter(noisy_img, 9, 75, 75)

# Custom sharpening kernel
sharpen_kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
sharpened = cv2.filter2D(img, -1, sharpen_kernel)

# Perspective transformation
pts1 = np.float32([[50, 50], [200, 50], [50, 200], [200, 200]])
pts2 = np.float32([[10, 100], [200, 50], [100, 250], [200, 200]])
perspective_matrix = cv2.getPerspectiveTransform(pts1, pts2)
perspective = cv2.warpPerspective(img, perspective_matrix, (300, 300))

# Display results
fig, axes = plt.subplots(3, 3, figsize=(15, 15))
images = [
    (img, 'Original'),
    (rotated, 'Rotated 45°'),
    (translated, 'Translated (50, 30)'),
    (noisy_img, 'Noisy Image'),
    (gaussian_blur, 'Gaussian Blur'),
    (median_blur, 'Median Blur'),
    (bilateral, 'Bilateral Filter'),
    (sharpened, 'Sharpened'),
    (perspective, 'Perspective Transform')
]

for ax, (image, title) in zip(axes.flat, images):
    ax.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    ax.set_title(title)
    ax.axis('off')

plt.tight_layout()
plt.show()

print("\\nFiltering Comparison:")
print("- Gaussian: General smoothing")
print("- Median: Best for salt-and-pepper noise")
print("- Bilateral: Preserves edges while smoothing")
print("- Custom kernels: Task-specific operations")
`,
      code: `import cv2
import numpy as np

# Create sample image
img = np.random.randint(100, 200, (300, 300, 3), dtype=np.uint8)

# Rotation
center = (150, 150)
rotation_matrix = cv2.getRotationMatrix2D(center, 45, 1.0)
rotated = cv2.warpAffine(img, rotation_matrix, (300, 300))

# Translation
translation_matrix = np.float32([[1, 0, 50], [0, 1, 30]])
translated = cv2.warpAffine(img, translation_matrix, (300, 300))

# Filtering
gaussian = cv2.GaussianBlur(img, (5, 5), 0)
median = cv2.medianBlur(img, 5)
bilateral = cv2.bilateralFilter(img, 9, 75, 75)

# Sharpening
sharpen_kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
sharpened = cv2.filter2D(img, -1, sharpen_kernel)

print("Transformations and filtering completed!")
print(f"Original shape: {img.shape}")
print(f"Rotated shape: {rotated.shape}")
print(f"Filtered shapes: {gaussian.shape}")
`
    },
    {
      title: 'Edge Detection & Feature Extraction',
      description: `
## Edge Detection & Feature Extraction

### Overview
Edge detection identifies boundaries where pixel intensity changes sharply. Feature extraction finds distinctive patterns (corners, blobs, edges) that are useful for object recognition, tracking, and matching.

### Key Concepts

**Edge Detection Algorithms**:
- Sobel: Gradient-based, directional
- Canny: Multi-stage, optimal edge detector
- Laplacian: Second derivative, finds zero-crossings
- Prewitt: Similar to Sobel, simpler kernel

**Canny Edge Detection Steps**:
1. Gaussian smoothing (noise reduction)
2. Gradient calculation (Sobel)
3. Non-maximum suppression (thin edges)
4. Double thresholding (strong/weak edges)
5. Edge tracking by hysteresis

**Feature Detectors**:
- Harris Corner: Detects corners
- SIFT: Scale-Invariant Feature Transform
- SURF: Speeded-Up Robust Features
- ORB: Oriented FAST and Rotated BRIEF (fast, free)

**Applications**:
- Object detection and recognition
- Image stitching (panoramas)
- 3D reconstruction
- Motion tracking

### Problem Statement
1. Implement Sobel edge detection
2. Apply Canny edge detector
3. Compare edge detection methods
4. Extract keypoints with ORB
5. Match features between images

### Expected Output
- Edge maps from different algorithms
- Detected keypoints and descriptors
- Feature matching visualization
`,
      starterCode: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Create sample image with shapes
img = np.zeros((400, 400), dtype=np.uint8)
cv2.rectangle(img, (50, 50), (150, 150), 255, -1)
cv2.circle(img, (300, 100), 50, 255, -1)
cv2.line(img, (50, 250), (350, 350), 255, 3)

# Add Gaussian noise
noisy = img + np.random.normal(0, 10, img.shape).astype(np.uint8)

# TODO: Sobel edge detection
sobelx = cv2.Sobel(noisy, cv2.CV_64F, , , ksize=)
sobely = cv2.Sobel(noisy, cv2.CV_64F, , , ksize=)
sobel_combined = np.sqrt(sobelx**2 + sobely**2)
sobel_combined = np.uint8(sobel_combined / sobel_combined.max() * 255)

# TODO: Canny edge detection
canny = cv2.Canny(noisy, , )

# TODO: Laplacian edge detection
laplacian = cv2.Laplacian(noisy, cv2.CV_64F)
laplacian = np.uint8(np.absolute(laplacian))

# TODO: ORB feature detection
orb = cv2.ORB_create()
keypoints, descriptors = orb.detectAndCompute(img, None)
img_keypoints = cv2.drawKeypoints(img, keypoints, None, 
                                  flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)

# Display results
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes[0, 0].imshow(noisy, cmap='gray')
axes[0, 0].set_title('Original (Noisy)')
axes[0, 1].imshow(sobel_combined, cmap='gray')
axes[0, 1].set_title('Sobel Edge Detection')
axes[0, 2].imshow(canny, cmap='gray')
axes[0, 2].set_title('Canny Edge Detection')
axes[1, 0].imshow(laplacian, cmap='gray')
axes[1, 0].set_title('Laplacian Edge Detection')
axes[1, 1].imshow(img_keypoints)
axes[1, 1].set_title(f'ORB Keypoints ({len(keypoints)})')

# Gradient direction
gradient_direction = np.arctan2(sobely, sobelx)
axes[1, 2].imshow(gradient_direction, cmap='hsv')
axes[1, 2].set_title('Gradient Direction')

for ax in axes.flat:
    ax.axis('off')
plt.tight_layout()
plt.show()

print(f"Detected {len(keypoints)} keypoints")
print(f"Descriptor shape: {descriptors.shape}")
`,
      solution: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Create sample image
img = np.zeros((400, 400), dtype=np.uint8)
cv2.rectangle(img, (50, 50), (150, 150), 255, -1)
cv2.circle(img, (300, 100), 50, 255, -1)
cv2.line(img, (50, 250), (350, 350), 255, 3)
noisy = img + np.random.normal(0, 10, img.shape).astype(np.uint8)

# Sobel edge detection
sobelx = cv2.Sobel(noisy, cv2.CV_64F, 1, 0, ksize=3)
sobely = cv2.Sobel(noisy, cv2.CV_64F, 0, 1, ksize=3)
sobel_combined = np.sqrt(sobelx**2 + sobely**2)
sobel_combined = np.uint8(sobel_combined / sobel_combined.max() * 255)

# Canny edge detection
canny = cv2.Canny(noisy, 50, 150)

# Laplacian edge detection
laplacian = cv2.Laplacian(noisy, cv2.CV_64F)
laplacian = np.uint8(np.absolute(laplacian))

# ORB feature detection
orb = cv2.ORB_create(nfeatures=100)
keypoints, descriptors = orb.detectAndCompute(img, None)
img_keypoints = cv2.drawKeypoints(
    cv2.cvtColor(img, cv2.COLOR_GRAY2BGR), 
    keypoints, None, 
    color=(0, 255, 0),
    flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS
)

# Display results
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes[0, 0].imshow(noisy, cmap='gray')
axes[0, 0].set_title('Original (Noisy)')
axes[0, 1].imshow(sobel_combined, cmap='gray')
axes[0, 1].set_title('Sobel Edge Detection')
axes[0, 2].imshow(canny, cmap='gray')
axes[0, 2].set_title('Canny Edge Detection')
axes[1, 0].imshow(laplacian, cmap='gray')
axes[1, 0].set_title('Laplacian Edge Detection')
axes[1, 1].imshow(cv2.cvtColor(img_keypoints, cv2.COLOR_BGR2RGB))
axes[1, 1].set_title(f'ORB Keypoints ({len(keypoints)})')

gradient_direction = np.arctan2(sobely, sobelx)
axes[1, 2].imshow(gradient_direction, cmap='hsv')
axes[1, 2].set_title('Gradient Direction')

for ax in axes.flat:
    ax.axis('off')
plt.tight_layout()
plt.show()

print(f"\\nEdge Detection Comparison:")
print(f"- Sobel: Gradient-based, shows edge strength")
print(f"- Canny: Multi-stage, produces thin edges")
print(f"- Laplacian: Second derivative, finds zero-crossings")
print(f"\\nFeature Detection:")
print(f"- Detected {len(keypoints)} ORB keypoints")
print(f"- Descriptor shape: {descriptors.shape}")
print(f"- Each descriptor: 32 bytes (256 bits)")
`,
      code: `import cv2
import numpy as np

# Create sample image
img = np.zeros((400, 400), dtype=np.uint8)
cv2.rectangle(img, (50, 50), (150, 150), 255, -1)
cv2.circle(img, (300, 100), 50, 255, -1)
cv2.line(img, (50, 250), (350, 350), 255, 3)

# Sobel
sobelx = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
sobely = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
sobel = np.sqrt(sobelx**2 + sobely**2)
sobel = np.uint8(sobel / sobel.max() * 255)

# Canny
canny = cv2.Canny(img, 50, 150)

# Laplacian
laplacian = cv2.Laplacian(img, cv2.CV_64F)
laplacian = np.uint8(np.absolute(laplacian))

# ORB features
orb = cv2.ORB_create(nfeatures=100)
keypoints, descriptors = orb.detectAndCompute(img, None)

print(f"Sobel edges: {np.count_nonzero(sobel > 50)}")
print(f"Canny edges: {np.count_nonzero(canny)}")
print(f"ORB keypoints: {len(keypoints)}")
print(f"Descriptor shape: {descriptors.shape}")
`
    },
    {
      title: 'Object Detection with YOLO',
      description: `
## Object Detection with YOLO

### Overview
YOLO (You Only Look Once) is a state-of-the-art real-time object detection system. YOLOv8-v10 (2024) achieve 50+ FPS with 90%+ accuracy, making them ideal for real-time applications.

### Key Concepts

**YOLO Architecture**:
- Single-stage detector (vs two-stage R-CNN)
- Divides image into grid cells
- Each cell predicts bounding boxes + class probabilities
- End-to-end training

**YOLOv8-v10 Improvements**:
- YOLOv8: Anchor-free, improved backbone
- YOLOv9: Programmable Gradient Information (PGI)
- YOLOv10: NMS-free training, dual assignments
- 3x faster than YOLOv5, 20% more accurate

**Detection Pipeline**:
1. Image preprocessing (resize, normalize)
2. Forward pass through network
3. Non-Maximum Suppression (NMS)
4. Post-processing (draw boxes, labels)

**Metrics**:
- IoU: Intersection over Union
- mAP: Mean Average Precision
- FPS: Frames Per Second

### Problem Statement
1. Load pre-trained YOLO model
2. Perform object detection on images
3. Visualize detections with bounding boxes
4. Calculate detection metrics
5. Real-time video detection

### Expected Output
- Detected objects with bounding boxes
- Class labels and confidence scores
- Detection performance metrics
`,
      starterCode: `import cv2
import numpy as np
from ultralytics import YOLO

# TODO: Load YOLOv8 model
model = YOLO('')  # 'yolov8n.pt' for nano, 'yolov8s.pt' for small

# Create sample image (in practice, load real image)
img = np.random.randint(0, 255, (640, 640, 3), dtype=np.uint8)

# TODO: Perform detection
results = model(img)

# TODO: Extract detections
for result in results:
    boxes = result.boxes
    for box in boxes:
        # Get box coordinates
        x1, y1, x2, y2 = box.xyxy[0]
        x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
        
        # Get confidence and class
        confidence = box.conf[0]
        class_id = int(box.cls[0])
        class_name = model.names[class_id]
        
        # TODO: Draw bounding box
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        
        # TODO: Draw label
        label = f'{class_name} {confidence:.2f}'
        cv2.putText(img, label, (x1, y1 - 10),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# Display result
import matplotlib.pyplot as plt
plt.figure(figsize=(12, 8))
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.title('YOLO Object Detection')
plt.axis('off')
plt.show()

# TODO: Calculate metrics
print(f"Detected {len(boxes)} objects")
print(f"Classes: {[model.names[int(box.cls[0])] for box in boxes]}")
`,
      solution: `import cv2
import numpy as np

# Simulated YOLO detection (since we can't install ultralytics in this environment)
print("YOLO Object Detection Implementation")
print("="*50)

# Create sample image
img = np.random.randint(0, 255, (640, 640, 3), dtype=np.uint8)

# Simulated detections
detections = [
    {'bbox': [100, 100, 300, 300], 'class': 'person', 'confidence': 0.95},
    {'bbox': [350, 150, 500, 400], 'class': 'car', 'confidence': 0.87},
    {'bbox': [50, 400, 200, 600], 'class': 'dog', 'confidence': 0.92}
]

# Draw detections
for det in detections:
    x1, y1, x2, y2 = det['bbox']
    class_name = det['class']
    confidence = det['confidence']
    
    # Draw bounding box
    cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
    
    # Draw label
    label = f"{class_name} {confidence:.2f}"
    (label_width, label_height), _ = cv2.getTextSize(
        label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2
    )
    cv2.rectangle(img, (x1, y1 - label_height - 10), 
                 (x1 + label_width, y1), (0, 255, 0), -1)
    cv2.putText(img, label, (x1, y1 - 5),
               cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)

# Display
import matplotlib.pyplot as plt
plt.figure(figsize=(12, 8))
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.title('YOLO Object Detection Results')
plt.axis('off')
plt.show()

# Metrics
print(f"\\nDetection Results:")
print(f"Total objects detected: {len(detections)}")
for i, det in enumerate(detections, 1):
    print(f"{i}. {det['class']}: {det['confidence']:.2%} confidence")

print(f"\\nYOLO Advantages:")
print("- Real-time performance (50+ FPS)")
print("- Single-stage detection (fast)")
print("- High accuracy (90%+ mAP)")
print("- Easy to use and deploy")

print(f"\\nYOLO Versions:")
print("- YOLOv8: Anchor-free, improved backbone")
print("- YOLOv9: PGI for better gradients")
print("- YOLOv10: NMS-free, dual assignments")
`,
      code: `import cv2
import numpy as np

# Create sample image
img = np.random.randint(0, 255, (640, 640, 3), dtype=np.uint8)

# Simulated YOLO detections
detections = [
    {'bbox': [100, 100, 300, 300], 'class': 'person', 'conf': 0.95},
    {'bbox': [350, 150, 500, 400], 'class': 'car', 'conf': 0.87},
    {'bbox': [50, 400, 200, 600], 'class': 'dog', 'conf': 0.92}
]

# Draw detections
for det in detections:
    x1, y1, x2, y2 = det['bbox']
    cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
    label = f"{det['class']} {det['conf']:.2f}"
    cv2.putText(img, label, (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

print(f"Detected {len(detections)} objects")
for det in detections:
    print(f"- {det['class']}: {det['conf']:.2%}")
`
    },
    {
      title: 'Image Segmentation: Semantic, Instance & Panoptic',
      description: `
## Image Segmentation

### Overview
Image segmentation assigns a label to every pixel in an image. Semantic segmentation classifies pixels by category, instance segmentation separates individual objects, and panoptic segmentation combines both.

### Key Concepts

**Segmentation Types**:
- Semantic: Pixel-wise classification (all cars = same class)
- Instance: Separate each object (car1, car2, car3)
- Panoptic: Semantic + Instance unified

**Architectures**:
- U-Net: Encoder-decoder with skip connections
- Mask R-CNN: Instance segmentation (extends Faster R-CNN)
- DeepLab: Atrous convolution, ASPP
- SAM (Segment Anything Model): Zero-shot segmentation

**U-Net Architecture**:
- Contracting path (encoder): Downsampling
- Expanding path (decoder): Upsampling
- Skip connections: Preserve spatial information
- Widely used in medical imaging

**Applications**:
- Medical image analysis
- Autonomous driving (road, pedestrians, vehicles)
- Background removal
- Satellite imagery analysis

### Problem Statement
1. Implement simple semantic segmentation
2. Use pre-trained segmentation model
3. Visualize segmentation masks
4. Calculate IoU metrics
5. Compare segmentation methods

### Expected Output
- Segmentation masks for different classes
- Colored overlay on original image
- IoU and pixel accuracy metrics
`,
      starterCode: `import cv2
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import jaccard_score

# Create sample image with regions
img = np.zeros((400, 400, 3), dtype=np.uint8)
cv2.rectangle(img, (50, 50), (200, 200), (255, 0, 0), -1)  # Blue region
cv2.circle(img, (300, 300), 80, (0, 255, 0), -1)  # Green region
cv2.rectangle(img, (250, 50), (380, 150), (0, 0, 255), -1)  # Red region

# TODO: Simple color-based segmentation
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Segment blue region
lower_blue = np.array([100, 50, 50])
upper_blue = np.array([130, 255, 255])
mask_blue = 

# Segment green region
lower_green = np.array([40, 50, 50])
upper_green = np.array([80, 255, 255])
mask_green = 

# Segment red region
lower_red = np.array([0, 50, 50])
upper_red = np.array([10, 255, 255])
mask_red = 

# TODO: Create semantic segmentation mask
semantic_mask = np.zeros((400, 400), dtype=np.uint8)
semantic_mask[mask_blue > 0] = 1  # Class 1: Blue
semantic_mask[mask_green > 0] = 2  # Class 2: Green
semantic_mask[mask_red > 0] = 3  # Class 3: Red

# TODO: Create colored overlay
overlay = np.zeros_like(img)
overlay[semantic_mask == 1] = [255, 0, 0]  # Blue
overlay[semantic_mask == 2] = [0, 255, 0]  # Green
overlay[semantic_mask == 3] = [0, 0, 255]  # Red

# Blend with original
blended = cv2.addWeighted(img, 0.6, overlay, 0.4, 0)

# Display results
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes[0, 0].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
axes[0, 0].set_title('Original Image')
axes[0, 1].imshow(semantic_mask, cmap='tab10')
axes[0, 1].set_title('Semantic Segmentation')
axes[0, 2].imshow(cv2.cvtColor(blended, cv2.COLOR_BGR2RGB))
axes[0, 2].set_title('Overlay')

axes[1, 0].imshow(mask_blue, cmap='gray')
axes[1, 0].set_title('Blue Mask')
axes[1, 1].imshow(mask_green, cmap='gray')
axes[1, 1].set_title('Green Mask')
axes[1, 2].imshow(mask_red, cmap='gray')
axes[1, 2].set_title('Red Mask')

for ax in axes.flat:
    ax.axis('off')
plt.tight_layout()
plt.show()

# TODO: Calculate metrics
print(f"Unique classes: {np.unique(semantic_mask)}")
print(f"Pixels per class:")
for i in range(4):
    count = np.sum(semantic_mask == i)
    print(f"  Class {i}: {count} pixels ({count/semantic_mask.size*100:.1f}%)")
`,
      solution: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Create sample image
img = np.zeros((400, 400, 3), dtype=np.uint8)
cv2.rectangle(img, (50, 50), (200, 200), (255, 0, 0), -1)
cv2.circle(img, (300, 300), 80, (0, 255, 0), -1)
cv2.rectangle(img, (250, 50), (380, 150), (0, 0, 255), -1)

# Color-based segmentation
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

mask_blue = cv2.inRange(hsv, np.array([100, 50, 50]), np.array([130, 255, 255]))
mask_green = cv2.inRange(hsv, np.array([40, 50, 50]), np.array([80, 255, 255]))
mask_red = cv2.inRange(hsv, np.array([0, 50, 50]), np.array([10, 255, 255]))

# Semantic segmentation mask
semantic_mask = np.zeros((400, 400), dtype=np.uint8)
semantic_mask[mask_blue > 0] = 1
semantic_mask[mask_green > 0] = 2
semantic_mask[mask_red > 0] = 3

# Colored overlay
overlay = np.zeros_like(img)
overlay[semantic_mask == 1] = [255, 0, 0]
overlay[semantic_mask == 2] = [0, 255, 0]
overlay[semantic_mask == 3] = [0, 0, 255]

blended = cv2.addWeighted(img, 0.6, overlay, 0.4, 0)

# Instance segmentation simulation
instance_mask = np.zeros((400, 400), dtype=np.uint8)
contours_blue, _ = cv2.findContours(mask_blue, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
contours_green, _ = cv2.findContours(mask_green, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
contours_red, _ = cv2.findContours(mask_red, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

instance_id = 1
for contour in contours_blue + contours_green + contours_red:
    cv2.drawContours(instance_mask, [contour], -1, instance_id, -1)
    instance_id += 1

# Display results
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes[0, 0].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
axes[0, 0].set_title('Original Image')
axes[0, 1].imshow(semantic_mask, cmap='tab10')
axes[0, 1].set_title('Semantic Segmentation')
axes[0, 2].imshow(cv2.cvtColor(blended, cv2.COLOR_BGR2RGB))
axes[0, 2].set_title('Overlay')

axes[1, 0].imshow(instance_mask, cmap='tab10')
axes[1, 0].set_title('Instance Segmentation')
axes[1, 1].imshow(mask_blue + mask_green + mask_red, cmap='gray')
axes[1, 1].set_title('Combined Masks')

# Panoptic visualization
panoptic = semantic_mask.copy()
axes[1, 2].imshow(panoptic, cmap='tab10')
axes[1, 2].set_title('Panoptic Segmentation')

for ax in axes.flat:
    ax.axis('off')
plt.tight_layout()
plt.show()

print("\\nSegmentation Types:")
print("- Semantic: Pixel-wise classification")
print("- Instance: Separate individual objects")
print("- Panoptic: Semantic + Instance combined")
print(f"\\nDetected {instance_id-1} instances")
print(f"Classes: {np.unique(semantic_mask)}")
`,
      code: `import cv2
import numpy as np

# Create sample image
img = np.zeros((400, 400, 3), dtype=np.uint8)
cv2.rectangle(img, (50, 50), (200, 200), (255, 0, 0), -1)
cv2.circle(img, (300, 300), 80, (0, 255, 0), -1)
cv2.rectangle(img, (250, 50), (380, 150), (0, 0, 255), -1)

# HSV segmentation
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
mask_blue = cv2.inRange(hsv, np.array([100, 50, 50]), np.array([130, 255, 255]))
mask_green = cv2.inRange(hsv, np.array([40, 50, 50]), np.array([80, 255, 255]))
mask_red = cv2.inRange(hsv, np.array([0, 50, 50]), np.array([10, 255, 255]))

# Semantic mask
semantic_mask = np.zeros((400, 400), dtype=np.uint8)
semantic_mask[mask_blue > 0] = 1
semantic_mask[mask_green > 0] = 2
semantic_mask[mask_red > 0] = 3

print(f"Classes: {np.unique(semantic_mask)}")
for i in range(4):
    count = np.sum(semantic_mask == i)
    print(f"Class {i}: {count} pixels ({count/semantic_mask.size*100:.1f}%)")
`
    },
    {
      title: 'Face Detection & Recognition',
      description: `
## Face Detection & Recognition

### Overview
Face detection locates faces in images, while face recognition identifies specific individuals. Modern approaches use deep learning (FaceNet, ArcFace) achieving 99.8%+ accuracy on benchmark datasets.

### Key Concepts

**Face Detection Methods**:
- Haar Cascades: Classical, fast but less accurate
- HOG + SVM: Histogram of Oriented Gradients
- MTCNN: Multi-task Cascaded CNN
- MediaPipe: Google's lightweight solution
- RetinaFace: State-of-the-art detector

**Face Recognition Pipeline**:
1. Face detection (locate face)
2. Face alignment (normalize pose)
3. Feature extraction (embeddings)
4. Similarity comparison (cosine distance)

**Deep Learning Models**:
- FaceNet: Triplet loss, 128-D embeddings
- ArcFace: Additive angular margin loss
- DeepFace: Facebook's recognition system
- dlib: 68 facial landmarks

**Applications**:
- Security and surveillance
- Photo organization
- Attendance systems
- Emotion recognition
- Age/gender estimation

### Problem Statement
1. Detect faces using Haar Cascades
2. Extract facial landmarks
3. Implement face recognition
4. Calculate face similarity
5. Real-time face detection

### Expected Output
- Detected faces with bounding boxes
- Facial landmarks visualization
- Face recognition results with confidence
`,
      starterCode: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load Haar Cascade classifier
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)
eye_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_eye.xml'
)

# Create sample image with face-like pattern
img = np.ones((400, 400, 3), dtype=np.uint8) * 200
# Draw face-like structure
cv2.circle(img, (200, 200), 100, (150, 150, 150), -1)  # Face
cv2.circle(img, (170, 180), 15, (50, 50, 50), -1)  # Left eye
cv2.circle(img, (230, 180), 15, (50, 50, 50), -1)  # Right eye
cv2.ellipse(img, (200, 230), (40, 20), 0, 0, 180, (100, 100, 100), 2)  # Mouth

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# TODO: Detect faces
faces = face_cascade.detectMultiScale(
    gray,
    scaleFactor=,
    minNeighbors=,
    minSize=(, )
)

# TODO: Draw rectangles around faces
img_faces = img.copy()
for (x, y, w, h) in faces:
    cv2.rectangle(img_faces, (x, y), (x+w, y+h), (0, 255, 0), 2)
    
    # Detect eyes in face region
    roi_gray = gray[y:y+h, x:x+w]
    roi_color = img_faces[y:y+h, x:x+w]
    eyes = eye_cascade.detectMultiScale(roi_gray)
    
    for (ex, ey, ew, eh) in eyes:
        cv2.rectangle(roi_color, (ex, ey), (ex+ew, ey+eh), (255, 0, 0), 2)

# TODO: Simulated face embeddings (in practice, use FaceNet/ArcFace)
def get_face_embedding(face_img):
    # Simplified: In reality, use deep learning model
    return np.random.randn(128)  # 128-D embedding

# TODO: Calculate similarity
def cosine_similarity(emb1, emb2):
    return np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))

# Display results
fig, axes = plt.subplots(1, 2, figsize=(12, 6))
axes[0].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
axes[0].set_title('Original Image')
axes[1].imshow(cv2.cvtColor(img_faces, cv2.COLOR_BGR2RGB))
axes[1].set_title(f'Detected Faces: {len(faces)}')

for ax in axes:
    ax.axis('off')
plt.tight_layout()
plt.show()

print(f"Detected {len(faces)} face(s)")
for i, (x, y, w, h) in enumerate(faces, 1):
    print(f"Face {i}: Position ({x}, {y}), Size {w}x{h}")
`,
      solution: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load Haar Cascades
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)
eye_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_eye.xml'
)

# Create sample image
img = np.ones((400, 400, 3), dtype=np.uint8) * 200
cv2.circle(img, (200, 200), 100, (150, 150, 150), -1)
cv2.circle(img, (170, 180), 15, (50, 50, 50), -1)
cv2.circle(img, (230, 180), 15, (50, 50, 50), -1)
cv2.ellipse(img, (200, 230), (40, 20), 0, 0, 180, (100, 100, 100), 2)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Detect faces
faces = face_cascade.detectMultiScale(
    gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30)
)

# Draw detections
img_faces = img.copy()
for (x, y, w, h) in faces:
    cv2.rectangle(img_faces, (x, y), (x+w, y+h), (0, 255, 0), 2)
    cv2.putText(img_faces, 'Face', (x, y-10), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    roi_gray = gray[y:y+h, x:x+w]
    roi_color = img_faces[y:y+h, x:x+w]
    eyes = eye_cascade.detectMultiScale(roi_gray)
    
    for (ex, ey, ew, eh) in eyes:
        cv2.rectangle(roi_color, (ex, ey), (ex+ew, ey+eh), (255, 0, 0), 2)

# Face recognition simulation
def get_face_embedding(face_img):
    # Simulated 128-D FaceNet embedding
    return np.random.randn(128)

def cosine_similarity(emb1, emb2):
    return np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))

# Simulate face database
database = {
    'person1': get_face_embedding(None),
    'person2': get_face_embedding(None),
    'person3': get_face_embedding(None)
}

# Test recognition
test_embedding = get_face_embedding(None)
similarities = {name: cosine_similarity(test_embedding, emb) 
                for name, emb in database.items()}
best_match = max(similarities, key=similarities.get)

# Display
fig, axes = plt.subplots(1, 2, figsize=(12, 6))
axes[0].imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
axes[0].set_title('Original Image')
axes[1].imshow(cv2.cvtColor(img_faces, cv2.COLOR_BGR2RGB))
axes[1].set_title(f'Detected: {len(faces)} face(s)')

for ax in axes:
    ax.axis('off')
plt.tight_layout()
plt.show()

print(f"\\nFace Detection Results:")
print(f"Detected {len(faces)} face(s)")

print(f"\\nFace Recognition Results:")
print(f"Best match: {best_match}")
print(f"Similarities:")
for name, sim in similarities.items():
    print(f"  {name}: {sim:.3f}")

print(f"\\nFace Detection Methods:")
print("- Haar Cascades: Fast, classical")
print("- MTCNN: Multi-task, accurate")
print("- MediaPipe: Lightweight, real-time")
print("- RetinaFace: State-of-the-art")
`,
      code: `import cv2
import numpy as np

# Load Haar Cascade
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)

# Create sample image
img = np.ones((400, 400, 3), dtype=np.uint8) * 200
cv2.circle(img, (200, 200), 100, (150, 150, 150), -1)
cv2.circle(img, (170, 180), 15, (50, 50, 50), -1)
cv2.circle(img, (230, 180), 15, (50, 50, 50), -1)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Detect faces
faces = face_cascade.detectMultiScale(gray, 1.1, 5, minSize=(30, 30))

# Draw rectangles
for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)

print(f"Detected {len(faces)} face(s)")

# Simulated face recognition
def cosine_similarity(emb1, emb2):
    return np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))

emb1 = np.random.randn(128)
emb2 = np.random.randn(128)
similarity = cosine_similarity(emb1, emb2)
print(f"Face similarity: {similarity:.3f}")
`
    },
    {
      title: 'Pose Estimation & Human Tracking',
      description: `
## Pose Estimation & Human Tracking

### Overview
Pose estimation detects human body keypoints (joints) to understand body posture and movement. Modern frameworks like MediaPipe and OpenPose achieve real-time performance with 95%+ accuracy.

### Key Concepts

**Keypoint Detection**:
- 17-33 keypoints (COCO, MediaPipe formats)
- Joints: shoulders, elbows, wrists, hips, knees, ankles
- Confidence scores per keypoint
- 2D vs 3D pose estimation

**Pose Estimation Approaches**:
- Top-down: Detect person first, then keypoints
- Bottom-up: Detect all keypoints, then group
- Single-person vs multi-person

**Popular Frameworks**:
- MediaPipe: Google, real-time, mobile-friendly
- OpenPose: CMU, multi-person, accurate
- AlphaPose: Fast, accurate, multi-person
- PoseNet: TensorFlow.js, browser-based

**Applications**:
- Fitness and sports analysis
- Motion capture for animation
- Sign language recognition
- Human-computer interaction
- Healthcare and rehabilitation

### Problem Statement
1. Detect human pose keypoints
2. Draw skeleton connections
3. Calculate joint angles
4. Track pose over time
5. Recognize poses/gestures

### Expected Output
- Detected keypoints with confidence scores
- Skeleton visualization
- Joint angle measurements
- Pose classification results
`,
      starterCode: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Simulated MediaPipe pose keypoints (33 landmarks)
# In practice: import mediapipe as mp; mp_pose = mp.solutions.pose

# Create sample image with person
img = np.ones((600, 400, 3), dtype=np.uint8) * 255

# TODO: Simulated pose keypoints (x, y, visibility)
# MediaPipe format: 33 landmarks
keypoints = {
    'nose': (200, 100, 0.95),
    'left_shoulder': (150, 200, 0.92),
    'right_shoulder': (250, 200, 0.93),
    'left_elbow': (120, 300, 0.88),
    'right_elbow': (280, 300, 0.90),
    'left_wrist': (100, 400, 0.85),
    'right_wrist': (300, 400, 0.87),
    'left_hip': (170, 350, 0.91),
    'right_hip': (230, 350, 0.92),
    'left_knee': (160, 470, 0.89),
    'right_knee': (240, 470, 0.90),
    'left_ankle': (150, 580, 0.86),
    'right_ankle': (250, 580, 0.88)
}

# TODO: Define skeleton connections
connections = [
    ('nose', 'left_shoulder'),
    ('nose', 'right_shoulder'),
    ('left_shoulder', 'right_shoulder'),
    ('left_shoulder', 'left_elbow'),
    ('left_elbow', 'left_wrist'),
    ('right_shoulder', 'right_elbow'),
    ('right_elbow', 'right_wrist'),
    ('left_shoulder', 'left_hip'),
    ('right_shoulder', 'right_hip'),
    ('left_hip', 'right_hip'),
    ('left_hip', 'left_knee'),
    ('left_knee', 'left_ankle'),
    ('right_hip', 'right_knee'),
    ('right_knee', 'right_ankle')
]

# TODO: Draw keypoints
img_pose = img.copy()
for name, (x, y, conf) in keypoints.items():
    if conf > 0.5:  # Confidence threshold
        cv2.circle(img_pose, (int(x), int(y)), 5, (0, 255, 0), -1)

# TODO: Draw skeleton connections
for start, end in connections:
    if start in keypoints and end in keypoints:
        x1, y1, conf1 = keypoints[start]
        x2, y2, conf2 = keypoints[end]
        if conf1 > 0.5 and conf2 > 0.5:
            cv2.line(img_pose, (int(x1), int(y1)), (int(x2), int(y2)), 
                    (255, 0, 0), 2)

# TODO: Calculate joint angle (e.g., elbow angle)
def calculate_angle(p1, p2, p3):
    """Calculate angle at p2 formed by p1-p2-p3"""
    v1 = np.array([p1[0] - p2[0], p1[1] - p2[1]])
    v2 = np.array([p3[0] - p2[0], p3[1] - p2[1]])
    
    cos_angle = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))
    angle = np.arccos(np.clip(cos_angle, -1.0, 1.0))
    return np.degrees(angle)

# Calculate left elbow angle
left_elbow_angle = calculate_angle(
    keypoints['left_shoulder'][:2],
    keypoints['left_elbow'][:2],
    keypoints['left_wrist'][:2]
)

# Display
plt.figure(figsize=(12, 8))
plt.imshow(cv2.cvtColor(img_pose, cv2.COLOR_BGR2RGB))
plt.title(f'Pose Estimation - Left Elbow Angle: {left_elbow_angle:.1f}°')
plt.axis('off')
plt.show()

print(f"Detected {len(keypoints)} keypoints")
print(f"Left elbow angle: {left_elbow_angle:.1f}°")
`,
      solution: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Create sample image
img = np.ones((600, 400, 3), dtype=np.uint8) * 255

# Simulated pose keypoints
keypoints = {
    'nose': (200, 100, 0.95),
    'left_shoulder': (150, 200, 0.92),
    'right_shoulder': (250, 200, 0.93),
    'left_elbow': (120, 300, 0.88),
    'right_elbow': (280, 300, 0.90),
    'left_wrist': (100, 400, 0.85),
    'right_wrist': (300, 400, 0.87),
    'left_hip': (170, 350, 0.91),
    'right_hip': (230, 350, 0.92),
    'left_knee': (160, 470, 0.89),
    'right_knee': (240, 470, 0.90),
    'left_ankle': (150, 580, 0.86),
    'right_ankle': (250, 580, 0.88)
}

# Skeleton connections
connections = [
    ('nose', 'left_shoulder'), ('nose', 'right_shoulder'),
    ('left_shoulder', 'right_shoulder'),
    ('left_shoulder', 'left_elbow'), ('left_elbow', 'left_wrist'),
    ('right_shoulder', 'right_elbow'), ('right_elbow', 'right_wrist'),
    ('left_shoulder', 'left_hip'), ('right_shoulder', 'right_hip'),
    ('left_hip', 'right_hip'),
    ('left_hip', 'left_knee'), ('left_knee', 'left_ankle'),
    ('right_hip', 'right_knee'), ('right_knee', 'right_ankle')
]

# Draw pose
img_pose = img.copy()

# Draw connections first
for start, end in connections:
    if start in keypoints and end in keypoints:
        x1, y1, conf1 = keypoints[start]
        x2, y2, conf2 = keypoints[end]
        if conf1 > 0.5 and conf2 > 0.5:
            cv2.line(img_pose, (int(x1), int(y1)), (int(x2), int(y2)), 
                    (255, 0, 0), 3)

# Draw keypoints on top
for name, (x, y, conf) in keypoints.items():
    if conf > 0.5:
        cv2.circle(img_pose, (int(x), int(y)), 6, (0, 255, 0), -1)
        cv2.circle(img_pose, (int(x), int(y)), 8, (0, 0, 255), 2)

# Calculate angles
def calculate_angle(p1, p2, p3):
    v1 = np.array([p1[0] - p2[0], p1[1] - p2[1]])
    v2 = np.array([p3[0] - p2[0], p3[1] - p2[1]])
    cos_angle = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2) + 1e-6)
    angle = np.arccos(np.clip(cos_angle, -1.0, 1.0))
    return np.degrees(angle)

left_elbow_angle = calculate_angle(
    keypoints['left_shoulder'][:2],
    keypoints['left_elbow'][:2],
    keypoints['left_wrist'][:2]
)

right_elbow_angle = calculate_angle(
    keypoints['right_shoulder'][:2],
    keypoints['right_elbow'][:2],
    keypoints['right_wrist'][:2]
)

left_knee_angle = calculate_angle(
    keypoints['left_hip'][:2],
    keypoints['left_knee'][:2],
    keypoints['left_ankle'][:2]
)

# Display
plt.figure(figsize=(12, 8))
plt.imshow(cv2.cvtColor(img_pose, cv2.COLOR_BGR2RGB))
plt.title('Pose Estimation with Joint Angles')
plt.axis('off')

# Add text annotations
plt.text(120, 320, f'{left_elbow_angle:.0f}°', 
         fontsize=12, color='red', weight='bold')
plt.text(280, 320, f'{right_elbow_angle:.0f}°', 
         fontsize=12, color='red', weight='bold')
plt.text(160, 490, f'{left_knee_angle:.0f}°', 
         fontsize=12, color='red', weight='bold')

plt.show()

print(f"\\nPose Estimation Results:")
print(f"Detected {len(keypoints)} keypoints")
print(f"\\nJoint Angles:")
print(f"  Left elbow: {left_elbow_angle:.1f}°")
print(f"  Right elbow: {right_elbow_angle:.1f}°")
print(f"  Left knee: {left_knee_angle:.1f}°")

print(f"\\nPose Estimation Frameworks:")
print("- MediaPipe: Real-time, mobile-friendly")
print("- OpenPose: Multi-person, accurate")
print("- AlphaPose: Fast, accurate")
print("- PoseNet: Browser-based")
`,
      code: `import cv2
import numpy as np

# Simulated pose keypoints
keypoints = {
    'nose': (200, 100, 0.95),
    'left_shoulder': (150, 200, 0.92),
    'right_shoulder': (250, 200, 0.93),
    'left_elbow': (120, 300, 0.88),
    'right_elbow': (280, 300, 0.90),
    'left_wrist': (100, 400, 0.85),
    'right_wrist': (300, 400, 0.87),
    'left_hip': (170, 350, 0.91),
    'right_hip': (230, 350, 0.92),
    'left_knee': (160, 470, 0.89),
    'right_knee': (240, 470, 0.90),
    'left_ankle': (150, 580, 0.86),
    'right_ankle': (250, 580, 0.88)
}

# Calculate angle
def calculate_angle(p1, p2, p3):
    v1 = np.array([p1[0] - p2[0], p1[1] - p2[1]])
    v2 = np.array([p3[0] - p2[0], p3[1] - p2[1]])
    cos_angle = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2) + 1e-6)
    return np.degrees(np.arccos(np.clip(cos_angle, -1.0, 1.0)))

left_elbow = calculate_angle(
    keypoints['left_shoulder'][:2],
    keypoints['left_elbow'][:2],
    keypoints['left_wrist'][:2]
)

print(f"Detected {len(keypoints)} keypoints")
print(f"Left elbow angle: {left_elbow:.1f}°")
`
    },
    {
      title: 'Optical Flow & Motion Analysis',
      description: `
## Optical Flow & Motion Analysis

### Overview
Optical flow estimates the motion of objects between consecutive frames by analyzing pixel intensity changes. It's fundamental for video analysis, object tracking, and motion-based applications.

### Key Concepts

**Optical Flow**:
- Dense: Computes flow for every pixel
- Sparse: Computes flow for specific features
- Assumes brightness constancy and small motion

**Algorithms**:
- Lucas-Kanade: Sparse optical flow
- Farneback: Dense optical flow
- Horn-Schunck: Global method
- Deep learning: FlowNet, PWC-Net

**Applications**:
- Video stabilization
- Motion detection and tracking
- Action recognition
- Autonomous vehicles (ego-motion)
- Video compression

**Motion Vectors**:
- Magnitude: Speed of motion
- Direction: Angle of movement
- Visualization: Color-coded flow fields

### Problem Statement
1. Compute optical flow between frames
2. Visualize motion vectors
3. Detect moving objects
4. Calculate motion statistics
5. Track objects across frames

### Expected Output
- Flow field visualization
- Motion magnitude heatmap
- Tracked object trajectories
- Motion statistics (average speed, direction)
`,
      starterCode: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Create two frames with moving object
frame1 = np.zeros((400, 400), dtype=np.uint8)
frame2 = np.zeros((400, 400), dtype=np.uint8)

# Draw moving circle
cv2.circle(frame1, (150, 200), 30, 255, -1)
cv2.circle(frame2, (250, 200), 30, 255, -1)  # Moved right

# TODO: Compute dense optical flow (Farneback)
flow = cv2.calcOpticalFlowFarneback(
    frame1, frame2,
    None,
    pyr_scale=,
    levels=,
    winsize=,
    iterations=,
    poly_n=,
    poly_sigma=,
    flags=0
)

# TODO: Calculate flow magnitude and angle
magnitude, angle = cv2.cartToPolar(flow[..., 0], flow[..., 1])

# TODO: Create HSV visualization
hsv = np.zeros((400, 400, 3), dtype=np.uint8)
hsv[..., 0] = angle * 180 / np.pi / 2  # Hue = direction
hsv[..., 1] = 255  # Saturation = max
hsv[..., 2] = cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX)  # Value = magnitude

flow_rgb = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

# Display results
fig, axes = plt.subplots(2, 2, figsize=(12, 12))
axes[0, 0].imshow(frame1, cmap='gray')
axes[0, 0].set_title('Frame 1')
axes[0, 1].imshow(frame2, cmap='gray')
axes[0, 1].set_title('Frame 2')
axes[1, 0].imshow(cv2.cvtColor(flow_rgb, cv2.COLOR_BGR2RGB))
axes[1, 0].set_title('Optical Flow (Color = Direction)')
axes[1, 1].imshow(magnitude, cmap='hot')
axes[1, 1].set_title('Motion Magnitude')

for ax in axes.flat:
    ax.axis('off')
plt.tight_layout()
plt.show()

print(f"Average motion: {np.mean(magnitude):.2f} pixels")
print(f"Max motion: {np.max(magnitude):.2f} pixels")
`,
      solution: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Create frames with moving object
frame1 = np.zeros((400, 400), dtype=np.uint8)
frame2 = np.zeros((400, 400), dtype=np.uint8)

cv2.circle(frame1, (150, 200), 30, 255, -1)
cv2.circle(frame2, (250, 200), 30, 255, -1)

# Compute dense optical flow
flow = cv2.calcOpticalFlowFarneback(
    frame1, frame2, None,
    pyr_scale=0.5, levels=3, winsize=15,
    iterations=3, poly_n=5, poly_sigma=1.2, flags=0
)

# Calculate magnitude and angle
magnitude, angle = cv2.cartToPolar(flow[..., 0], flow[..., 1])

# HSV visualization
hsv = np.zeros((400, 400, 3), dtype=np.uint8)
hsv[..., 0] = angle * 180 / np.pi / 2
hsv[..., 1] = 255
hsv[..., 2] = cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX)
flow_rgb = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

# Sparse optical flow (Lucas-Kanade)
# Detect features in frame1
corners = cv2.goodFeaturesToTrack(frame1, maxCorners=100, qualityLevel=0.3, minDistance=7)

if corners is not None:
    # Calculate optical flow
    next_pts, status, error = cv2.calcOpticalFlowPyrLK(frame1, frame2, corners, None)
    
    # Draw tracks
    frame2_color = cv2.cvtColor(frame2, cv2.COLOR_GRAY2BGR)
    for i, (new, old) in enumerate(zip(next_pts, corners)):
        if status[i]:
            a, b = new.ravel()
            c, d = old.ravel()
            cv2.arrowedLine(frame2_color, (int(c), int(d)), (int(a), int(b)), (0, 255, 0), 2)
            cv2.circle(frame2_color, (int(a), int(b)), 5, (0, 0, 255), -1)

# Display
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes[0, 0].imshow(frame1, cmap='gray')
axes[0, 0].set_title('Frame 1')
axes[0, 1].imshow(frame2, cmap='gray')
axes[0, 1].set_title('Frame 2')
axes[0, 2].imshow(cv2.cvtColor(flow_rgb, cv2.COLOR_BGR2RGB))
axes[0, 2].set_title('Dense Flow (Color = Direction)')

axes[1, 0].imshow(magnitude, cmap='hot')
axes[1, 0].set_title('Motion Magnitude')
axes[1, 1].imshow(cv2.cvtColor(frame2_color, cv2.COLOR_BGR2RGB))
axes[1, 1].set_title('Sparse Flow (Lucas-Kanade)')

# Motion statistics
motion_mask = magnitude > 1.0
axes[1, 2].imshow(motion_mask, cmap='gray')
axes[1, 2].set_title('Motion Detection')

for ax in axes.flat:
    ax.axis('off')
plt.tight_layout()
plt.show()

print(f"\\nOptical Flow Statistics:")
print(f"Average motion: {np.mean(magnitude):.2f} pixels")
print(f"Max motion: {np.max(magnitude):.2f} pixels")
print(f"Moving pixels: {np.sum(motion_mask)} ({np.sum(motion_mask)/magnitude.size*100:.1f}%)")
`,
      code: `import cv2
import numpy as np

# Create frames
frame1 = np.zeros((400, 400), dtype=np.uint8)
frame2 = np.zeros((400, 400), dtype=np.uint8)
cv2.circle(frame1, (150, 200), 30, 255, -1)
cv2.circle(frame2, (250, 200), 30, 255, -1)

# Dense optical flow
flow = cv2.calcOpticalFlowFarneback(
    frame1, frame2, None, 0.5, 3, 15, 3, 5, 1.2, 0
)

magnitude, angle = cv2.cartToPolar(flow[..., 0], flow[..., 1])

print(f"Average motion: {np.mean(magnitude):.2f} pixels")
print(f"Max motion: {np.max(magnitude):.2f} pixels")
print(f"Dominant direction: {np.mean(angle)*180/np.pi:.1f}°")
`
    },
    {
      title: '3D Vision & Depth Estimation',
      description: `
## 3D Vision & Depth Estimation

### Overview
3D vision reconstructs three-dimensional structure from 2D images. Depth estimation predicts the distance of objects from the camera, enabling applications in robotics, AR/VR, and autonomous systems.

### Key Concepts

**Stereo Vision**:
- Two cameras (like human eyes)
- Disparity map: Pixel shift between views
- Triangulation: Compute depth from disparity
- Baseline: Distance between cameras

**Depth Estimation Methods**:
- Stereo matching: Traditional approach
- Monocular depth: Single camera + deep learning
- LiDAR: Laser-based measurement
- Time-of-Flight (ToF): Infrared sensors

**Deep Learning Models**:
- MiDaS: Monocular depth estimation
- DPT: Dense Prediction Transformer
- DepthAnything: Zero-shot depth
- NeRF: Neural Radiance Fields (3D reconstruction)

**Point Clouds**:
- 3D representation of scene
- Each point has (x, y, z) coordinates
- Can include color information
- Used in 3D reconstruction

**Applications**:
- Autonomous vehicles (obstacle detection)
- Robotics (navigation, grasping)
- AR/VR (occlusion, interaction)
- 3D scanning and modeling
- Medical imaging

### Problem Statement
1. Compute stereo disparity map
2. Convert disparity to depth
3. Create 3D point cloud
4. Visualize depth map
5. Estimate depth from single image

### Expected Output
- Disparity map visualization
- Depth map with color coding
- 3D point cloud representation
- Distance measurements
`,
      starterCode: `import cv2
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Create stereo pair (simulated)
left_img = np.zeros((400, 600), dtype=np.uint8)
right_img = np.zeros((400, 600), dtype=np.uint8)

# Draw objects at different depths
# Close object (large disparity)
cv2.rectangle(left_img, (100, 150), (200, 250), 255, -1)
cv2.rectangle(right_img, (80, 150), (180, 250), 255, -1)  # Shifted left

# Far object (small disparity)
cv2.circle(left_img, (450, 200), 40, 200, -1)
cv2.circle(right_img, (445, 200), 40, 200, -1)  # Small shift

# TODO: Create stereo matcher
stereo = cv2.StereoBM_create(numDisparities=, blockSize=)

# TODO: Compute disparity map
disparity = stereo.compute(left_img, right_img)

# TODO: Normalize for visualization
disparity_normalized = cv2.normalize(
    disparity, None, alpha=0, beta=255,
    norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8U
)

# TODO: Convert disparity to depth
# depth = (focal_length * baseline) / disparity
focal_length = 500  # pixels
baseline = 0.1  # meters
depth_map = np.zeros_like(disparity, dtype=np.float32)
depth_map[disparity > 0] = (focal_length * baseline) / disparity[disparity > 0]

# TODO: Create 3D point cloud
h, w = left_img.shape
y, x = np.mgrid[0:h, 0:w]
points_3d = np.zeros((h, w, 3))
points_3d[:, :, 0] = x
points_3d[:, :, 1] = y
points_3d[:, :, 2] = depth_map

# Display results
fig = plt.figure(figsize=(15, 10))

ax1 = fig.add_subplot(2, 3, 1)
ax1.imshow(left_img, cmap='gray')
ax1.set_title('Left Image')
ax1.axis('off')

ax2 = fig.add_subplot(2, 3, 2)
ax2.imshow(right_img, cmap='gray')
ax2.set_title('Right Image')
ax2.axis('off')

ax3 = fig.add_subplot(2, 3, 3)
ax3.imshow(disparity_normalized, cmap='jet')
ax3.set_title('Disparity Map')
ax3.axis('off')

ax4 = fig.add_subplot(2, 3, 4)
ax4.imshow(depth_map, cmap='plasma')
ax4.set_title('Depth Map')
ax4.axis('off')

# 3D visualization
ax5 = fig.add_subplot(2, 3, 5, projection='3d')
mask = (disparity > 0) & (depth_map < 100)
ax5.scatter(points_3d[mask, 0], points_3d[mask, 1], points_3d[mask, 2], 
           c=left_img[mask], cmap='gray', s=1)
ax5.set_title('3D Point Cloud')

plt.tight_layout()
plt.show()

print(f"Disparity range: {disparity.min():.1f} to {disparity.max():.1f}")
print(f"Depth range: {depth_map[mask].min():.2f}m to {depth_map[mask].max():.2f}m")
`,
      solution: `import cv2
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Create stereo pair
left_img = np.zeros((400, 600), dtype=np.uint8)
right_img = np.zeros((400, 600), dtype=np.uint8)

# Close object
cv2.rectangle(left_img, (100, 150), (200, 250), 255, -1)
cv2.rectangle(right_img, (80, 150), (180, 250), 255, -1)

# Far object
cv2.circle(left_img, (450, 200), 40, 200, -1)
cv2.circle(right_img, (445, 200), 40, 200, -1)

# Stereo matching
stereo = cv2.StereoBM_create(numDisparities=64, blockSize=15)
disparity = stereo.compute(left_img, right_img)

# Normalize
disparity_normalized = cv2.normalize(
    disparity, None, 0, 255, cv2.NORM_MINMAX, cv2.CV_8U
)

# Depth calculation
focal_length = 500
baseline = 0.1
depth_map = np.zeros_like(disparity, dtype=np.float32)
valid_disparity = disparity > 0
depth_map[valid_disparity] = (focal_length * baseline) / disparity[valid_disparity]

# 3D point cloud
h, w = left_img.shape
y, x = np.mgrid[0:h, 0:w]
points_3d = np.stack([x, y, depth_map], axis=-1)

# Display
fig = plt.figure(figsize=(16, 10))

ax1 = fig.add_subplot(2, 3, 1)
ax1.imshow(left_img, cmap='gray')
ax1.set_title('Left Image (Reference)')
ax1.axis('off')

ax2 = fig.add_subplot(2, 3, 2)
ax2.imshow(right_img, cmap='gray')
ax2.set_title('Right Image')
ax2.axis('off')

ax3 = fig.add_subplot(2, 3, 3)
im3 = ax3.imshow(disparity_normalized, cmap='jet')
ax3.set_title('Disparity Map (Closer = Warmer)')
ax3.axis('off')
plt.colorbar(im3, ax=ax3)

ax4 = fig.add_subplot(2, 3, 4)
im4 = ax4.imshow(depth_map, cmap='plasma', vmin=0, vmax=50)
ax4.set_title('Depth Map (meters)')
ax4.axis('off')
plt.colorbar(im4, ax=ax4)

# 3D point cloud
ax5 = fig.add_subplot(2, 3, 5, projection='3d')
mask = valid_disparity & (depth_map < 100)
sample = mask.copy()
sample[::5, ::5] = False  # Downsample for visualization
mask = mask & ~sample

ax5.scatter(points_3d[mask, 0], points_3d[mask, 1], points_3d[mask, 2],
           c=left_img[mask], cmap='gray', s=1, alpha=0.5)
ax5.set_xlabel('X')
ax5.set_ylabel('Y')
ax5.set_zlabel('Depth (m)')
ax5.set_title('3D Reconstruction')

# Depth histogram
ax6 = fig.add_subplot(2, 3, 6)
ax6.hist(depth_map[valid_disparity].flatten(), bins=50, color='cyan', alpha=0.7)
ax6.set_xlabel('Depth (m)')
ax6.set_ylabel('Frequency')
ax6.set_title('Depth Distribution')
ax6.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print(f"\\n3D Vision Statistics:")
print(f"Disparity range: {disparity[valid_disparity].min():.1f} to {disparity[valid_disparity].max():.1f} pixels")
print(f"Depth range: {depth_map[valid_disparity].min():.2f}m to {depth_map[valid_disparity].max():.2f}m")
print(f"Average depth: {depth_map[valid_disparity].mean():.2f}m")
print(f"Valid points: {np.sum(valid_disparity)} ({np.sum(valid_disparity)/valid_disparity.size*100:.1f}%)")
`,
      code: `import cv2
import numpy as np

# Create stereo pair
left = np.zeros((400, 600), dtype=np.uint8)
right = np.zeros((400, 600), dtype=np.uint8)
cv2.rectangle(left, (100, 150), (200, 250), 255, -1)
cv2.rectangle(right, (80, 150), (180, 250), 255, -1)

# Stereo matching
stereo = cv2.StereoBM_create(numDisparities=64, blockSize=15)
disparity = stereo.compute(left, right)

# Depth calculation
focal_length, baseline = 500, 0.1
depth = np.zeros_like(disparity, dtype=np.float32)
valid = disparity > 0
depth[valid] = (focal_length * baseline) / disparity[valid]

print(f"Disparity range: {disparity[valid].min():.1f}-{disparity[valid].max():.1f}")
print(f"Depth range: {depth[valid].min():.2f}m-{depth[valid].max():.2f}m")
`
    },
    {
      title: 'Video Analysis & Action Recognition',
      description: `
## Video Analysis & Action Recognition

### Overview
Video analysis extends image processing to temporal sequences, enabling action recognition, activity detection, and behavior analysis. Modern approaches use 3D CNNs and temporal models to capture motion patterns.

### Key Concepts

**Video Representation**:
- Frame sequences: Temporal dimension
- 3D convolutions: Spatial + temporal
- Two-stream networks: RGB + optical flow
- Temporal pooling: Aggregate over time

**Action Recognition Architectures**:
- 3D CNN (C3D): Spatio-temporal features
- Two-Stream CNN: Appearance + motion
- I3D: Inflated 3D ConvNet
- SlowFast: Dual-speed pathways
- Transformers: Video Vision Transformer (ViViT)

**Temporal Modeling**:
- LSTM/GRU: Sequential processing
- Temporal Segment Networks (TSN)
- Temporal Shift Module (TSM)
- Non-local blocks: Long-range dependencies

**Applications**:
- Sports analysis (action classification)
- Surveillance (anomaly detection)
- Healthcare (fall detection, gait analysis)
- Human-computer interaction
- Video understanding

### Problem Statement
1. Extract frames from video
2. Detect actions in video clips
3. Classify activities
4. Temporal action localization
5. Real-time action recognition

### Expected Output
- Action classification results
- Temporal activity timeline
- Confidence scores per action
- Frame-level predictions
`,
      starterCode: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Simulate video frames with action
def create_action_video(action_type='wave'):
    """Create synthetic video frames"""
    frames = []
    for i in range(30):  # 30 frames
        frame = np.ones((200, 200, 3), dtype=np.uint8) * 255
        
        if action_type == 'wave':
            # Simulate waving hand
            x = 100 + int(30 * np.sin(i * 0.3))
            y = 100
            cv2.circle(frame, (x, y), 20, (255, 0, 0), -1)
        elif action_type == 'jump':
            # Simulate jumping
            y = 150 - int(30 * abs(np.sin(i * 0.2)))
            cv2.circle(frame, (100, y), 20, (0, 255, 0), -1)
        
        frames.append(frame)
    return np.array(frames)

# TODO: Create video sequences
wave_video = create_action_video('wave')
jump_video = create_action_video('jump')

# TODO: Extract temporal features
def extract_temporal_features(video):
    """Extract simple temporal features"""
    # Frame differencing
    diffs = []
    for i in range(1, len(video)):
        diff = cv2.absdiff(video[i], video[i-1])
        diffs.append(np.mean(diff))
    
    # Motion statistics
    features = {
        'mean_motion': np.mean(diffs),
        'max_motion': np.max(diffs),
        'motion_variance': np.var(diffs)
    }
    return features, diffs

wave_features, wave_diffs = extract_temporal_features(wave_video)
jump_features, jump_diffs = extract_temporal_features(jump_video)

# TODO: Simple action classifier
def classify_action(features):
    """Simple rule-based classifier"""
    if features['motion_variance'] > 50:
        return 'wave', 0.85
    elif features['max_motion'] > 30:
        return 'jump', 0.78
    else:
        return 'static', 0.92

wave_action, wave_conf = classify_action(wave_features)
jump_action, jump_conf = classify_action(jump_features)

# Display results
fig, axes = plt.subplots(2, 3, figsize=(15, 10))

# Wave video frames
axes[0, 0].imshow(cv2.cvtColor(wave_video[0], cv2.COLOR_BGR2RGB))
axes[0, 0].set_title('Wave - Frame 1')
axes[0, 1].imshow(cv2.cvtColor(wave_video[15], cv2.COLOR_BGR2RGB))
axes[0, 1].set_title('Wave - Frame 15')
axes[0, 2].plot(wave_diffs)
axes[0, 2].set_title(f'Wave Motion\\nPredicted: {wave_action} ({wave_conf:.0%})')
axes[0, 2].set_xlabel('Frame')
axes[0, 2].set_ylabel('Motion')

# Jump video frames
axes[1, 0].imshow(cv2.cvtColor(jump_video[0], cv2.COLOR_BGR2RGB))
axes[1, 0].set_title('Jump - Frame 1')
axes[1, 1].imshow(cv2.cvtColor(jump_video[15], cv2.COLOR_BGR2RGB))
axes[1, 1].set_title('Jump - Frame 15')
axes[1, 2].plot(jump_diffs, color='green')
axes[1, 2].set_title(f'Jump Motion\\nPredicted: {jump_action} ({jump_conf:.0%})')
axes[1, 2].set_xlabel('Frame')
axes[1, 2].set_ylabel('Motion')

for ax in axes[:, :2].flat:
    ax.axis('off')

plt.tight_layout()
plt.show()

print(f"\\nAction Recognition Results:")
print(f"Wave video: {wave_action} ({wave_conf:.0%} confidence)")
print(f"Jump video: {jump_action} ({jump_conf:.0%} confidence)")
`,
      solution: `import cv2
import numpy as np
import matplotlib.pyplot as plt

def create_action_video(action_type='wave', num_frames=30):
    frames = []
    for i in range(num_frames):
        frame = np.ones((200, 200, 3), dtype=np.uint8) * 255
        
        if action_type == 'wave':
            x = 100 + int(30 * np.sin(i * 0.3))
            y = 100
            cv2.circle(frame, (x, y), 20, (255, 0, 0), -1)
            cv2.putText(frame, 'Waving', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2)
        elif action_type == 'jump':
            y = 150 - int(30 * abs(np.sin(i * 0.2)))
            cv2.circle(frame, (100, y), 20, (0, 255, 0), -1)
            cv2.putText(frame, 'Jumping', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2)
        elif action_type == 'walk':
            x = 50 + int(i * 5)
            cv2.circle(frame, (x, 150), 20, (0, 0, 255), -1)
            cv2.putText(frame, 'Walking', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2)
        
        frames.append(frame)
    return np.array(frames)

def extract_temporal_features(video):
    diffs = []
    for i in range(1, len(video)):
        diff = cv2.absdiff(video[i], video[i-1])
        diffs.append(np.mean(diff))
    
    features = {
        'mean_motion': np.mean(diffs),
        'max_motion': np.max(diffs),
        'motion_variance': np.var(diffs),
        'motion_trend': np.polyfit(range(len(diffs)), diffs, 1)[0]
    }
    return features, diffs

def classify_action(features):
    if features['motion_variance'] > 50:
        return 'wave', 0.85
    elif features['max_motion'] > 30:
        return 'jump', 0.78
    elif features['motion_trend'] > 0.5:
        return 'walk', 0.82
    else:
        return 'static', 0.92

# Create videos
actions = ['wave', 'jump', 'walk']
videos = {action: create_action_video(action) for action in actions}
results = {}

for action, video in videos.items():
    features, diffs = extract_temporal_features(video)
    predicted, confidence = classify_action(features)
    results[action] = {
        'features': features,
        'diffs': diffs,
        'predicted': predicted,
        'confidence': confidence
    }

# Display
fig, axes = plt.subplots(3, 3, figsize=(15, 12))

for idx, action in enumerate(actions):
    video = videos[action]
    result = results[action]
    
    # Frame samples
    axes[idx, 0].imshow(cv2.cvtColor(video[0], cv2.COLOR_BGR2RGB))
    axes[idx, 0].set_title(f'{action.capitalize()} - Start')
    axes[idx, 0].axis('off')
    
    axes[idx, 1].imshow(cv2.cvtColor(video[15], cv2.COLOR_BGR2RGB))
    axes[idx, 1].set_title(f'{action.capitalize()} - Middle')
    axes[idx, 1].axis('off')
    
    # Motion plot
    axes[idx, 2].plot(result['diffs'], linewidth=2)
    axes[idx, 2].set_title(f"Predicted: {result['predicted']} ({result['confidence']:.0%})")
    axes[idx, 2].set_xlabel('Frame')
    axes[idx, 2].set_ylabel('Motion Intensity')
    axes[idx, 2].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("\\nAction Recognition Results:")
print("="*50)
for action in actions:
    result = results[action]
    print(f"\\n{action.capitalize()} Video:")
    print(f"  Predicted: {result['predicted']}")
    print(f"  Confidence: {result['confidence']:.0%}")
    print(f"  Mean Motion: {result['features']['mean_motion']:.2f}")
    print(f"  Motion Variance: {result['features']['motion_variance']:.2f}")
`,
      code: `import cv2
import numpy as np

def create_action_video(action, frames=30):
    video = []
    for i in range(frames):
        frame = np.ones((200, 200, 3), dtype=np.uint8) * 255
        if action == 'wave':
            x = 100 + int(30 * np.sin(i * 0.3))
            cv2.circle(frame, (x, 100), 20, (255, 0, 0), -1)
        elif action == 'jump':
            y = 150 - int(30 * abs(np.sin(i * 0.2)))
            cv2.circle(frame, (100, y), 20, (0, 255, 0), -1)
        video.append(frame)
    return np.array(video)

def extract_features(video):
    diffs = [np.mean(cv2.absdiff(video[i], video[i-1])) for i in range(1, len(video))]
    return {'mean': np.mean(diffs), 'var': np.var(diffs)}

wave = create_action_video('wave')
jump = create_action_video('jump')

wave_feat = extract_features(wave)
jump_feat = extract_features(jump)

print(f"Wave: mean={wave_feat['mean']:.2f}, var={wave_feat['var']:.2f}")
print(f"Jump: mean={jump_feat['mean']:.2f}, var={jump_feat['var']:.2f}")
`
    },
    {
      title: 'GANs for Image Generation',
      description: `
## Generative Adversarial Networks (GANs)

### Overview
GANs consist of two neural networks (generator and discriminator) competing against each other to generate realistic images. They've revolutionized image synthesis, achieving photorealistic results.

### Key Concepts

**GAN Architecture**:
- Generator: Creates fake images from noise
- Discriminator: Distinguishes real from fake
- Adversarial training: Min-max game
- Nash equilibrium: Both networks optimal

**GAN Variants**:
- DCGAN: Deep Convolutional GAN
- StyleGAN: Style-based generator
- CycleGAN: Unpaired image-to-image translation
- Pix2Pix: Paired image-to-image translation
- ProGAN: Progressive growing

**Training Challenges**:
- Mode collapse: Generator produces limited variety
- Vanishing gradients: Discriminator too strong
- Training instability: Oscillating loss
- Solutions: Wasserstein loss, spectral normalization

**Applications**:
- Image generation (faces, art, scenes)
- Image-to-image translation
- Super-resolution
- Style transfer
- Data augmentation

### Problem Statement
1. Implement simple GAN architecture
2. Train generator and discriminator
3. Generate synthetic images
4. Visualize training progress
5. Evaluate image quality

### Expected Output
- Generated images over training
- Loss curves for G and D
- Real vs fake comparison
- Latent space interpolation
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers

# TODO: Build Generator
def build_generator(latent_dim=100):
    model = keras.Sequential([
        layers.Dense(, activation='relu', input_shape=(latent_dim,)),
        layers.BatchNormalization(),
        layers.Dense(, activation='relu'),
        layers.BatchNormalization(),
        layers.Dense(28 * 28, activation='tanh'),
        layers.Reshape((28, 28, 1))
    ])
    return model

# TODO: Build Discriminator
def build_discriminator():
    model = keras.Sequential([
        layers.Flatten(input_shape=(28, 28, 1)),
        layers.Dense(, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(1, activation='sigmoid')
    ])
    return model

# TODO: Build GAN
latent_dim = 100
generator = build_generator(latent_dim)
discriminator = build_discriminator()

discriminator.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.0002),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

discriminator.trainable = False
gan_input = keras.Input(shape=(latent_dim,))
generated_image = generator(gan_input)
gan_output = discriminator(generated_image)
gan = keras.Model(gan_input, gan_output)

gan.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.0002),
    loss='binary_crossentropy'
)

# TODO: Training loop (simplified)
def train_gan(epochs=100, batch_size=128):
    # Create simple dataset (random patterns)
    real_images = np.random.randn(1000, 28, 28, 1)
    
    for epoch in range(epochs):
        # Train discriminator
        noise = np.random.randn(batch_size, latent_dim)
        generated_images = generator.predict(noise, verbose=0)
        
        real_labels = np.ones((batch_size, 1))
        fake_labels = np.zeros((batch_size, 1))
        
        d_loss_real = discriminator.train_on_batch(
            real_images[:batch_size], real_labels
        )
        d_loss_fake = discriminator.train_on_batch(
            generated_images, fake_labels
        )
        
        # Train generator
        noise = np.random.randn(batch_size, latent_dim)
        g_loss = gan.train_on_batch(noise, real_labels)
        
        if epoch % 20 == 0:
            print(f"Epoch {epoch}: D_loss={d_loss_real[0]:.3f}, G_loss={g_loss:.3f}")

# Generate samples
print("Generating samples...")
noise = np.random.randn(16, latent_dim)
generated_images = generator.predict(noise, verbose=0)

# Display
fig, axes = plt.subplots(4, 4, figsize=(10, 10))
for i, ax in enumerate(axes.flat):
    ax.imshow(generated_images[i, :, :, 0], cmap='gray')
    ax.axis('off')
plt.suptitle('GAN Generated Images')
plt.tight_layout()
plt.show()
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras import layers

def build_generator(latent_dim=100):
    model = keras.Sequential([
        layers.Dense(256, activation='relu', input_shape=(latent_dim,)),
        layers.BatchNormalization(),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dense(1024, activation='relu'),
        layers.BatchNormalization(),
        layers.Dense(28 * 28, activation='tanh'),
        layers.Reshape((28, 28, 1))
    ], name='generator')
    return model

def build_discriminator():
    model = keras.Sequential([
        layers.Flatten(input_shape=(28, 28, 1)),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(1, activation='sigmoid')
    ], name='discriminator')
    return model

# Build models
latent_dim = 100
generator = build_generator(latent_dim)
discriminator = build_discriminator()

discriminator.compile(
    optimizer=keras.optimizers.Adam(0.0002, beta_1=0.5),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

discriminator.trainable = False
gan_input = keras.Input(shape=(latent_dim,))
generated_image = generator(gan_input)
gan_output = discriminator(generated_image)
gan = keras.Model(gan_input, gan_output, name='gan')

gan.compile(
    optimizer=keras.optimizers.Adam(0.0002, beta_1=0.5),
    loss='binary_crossentropy'
)

# Training
def train_gan(epochs=50, batch_size=128):
    # Simple synthetic data
    real_images = np.random.randn(1000, 28, 28, 1)
    real_images = (real_images - real_images.mean()) / real_images.std()
    
    d_losses, g_losses = [], []
    
    for epoch in range(epochs):
        # Train Discriminator
        idx = np.random.randint(0, real_images.shape[0], batch_size)
        real_batch = real_images[idx]
        
        noise = np.random.randn(batch_size, latent_dim)
        fake_batch = generator.predict(noise, verbose=0)
        
        d_loss_real = discriminator.train_on_batch(real_batch, np.ones((batch_size, 1)))
        d_loss_fake = discriminator.train_on_batch(fake_batch, np.zeros((batch_size, 1)))
        d_loss = 0.5 * np.add(d_loss_real[0], d_loss_fake[0])
        
        # Train Generator
        noise = np.random.randn(batch_size, latent_dim)
        g_loss = gan.train_on_batch(noise, np.ones((batch_size, 1)))
        
        d_losses.append(d_loss)
        g_losses.append(g_loss)
        
        if epoch % 10 == 0:
            print(f"Epoch {epoch}/{epochs} - D_loss: {d_loss:.4f}, G_loss: {g_loss:.4f}")
    
    return d_losses, g_losses

print("Training GAN...")
d_losses, g_losses = train_gan(epochs=50)

# Generate samples
noise = np.random.randn(16, latent_dim)
generated = generator.predict(noise, verbose=0)

# Display results
fig = plt.figure(figsize=(15, 10))

# Generated images
for i in range(16):
    ax = fig.add_subplot(4, 5, i+1)
    ax.imshow(generated[i, :, :, 0], cmap='gray')
    ax.axis('off')

# Loss curves
ax = fig.add_subplot(4, 5, 17)
ax.plot(d_losses, label='Discriminator', alpha=0.7)
ax.plot(g_losses, label='Generator', alpha=0.7)
ax.set_xlabel('Epoch')
ax.set_ylabel('Loss')
ax.set_title('Training Loss')
ax.legend()
ax.grid(True, alpha=0.3)

plt.suptitle('GAN: Generated Images & Training Progress', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

print(f"\\nGAN Training Complete!")
print(f"Final D_loss: {d_losses[-1]:.4f}")
print(f"Final G_loss: {g_losses[-1]:.4f}")
`,
      code: `import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

def build_generator(latent_dim=100):
    return keras.Sequential([
        layers.Dense(256, activation='relu', input_shape=(latent_dim,)),
        layers.BatchNormalization(),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dense(28*28, activation='tanh'),
        layers.Reshape((28, 28, 1))
    ])

def build_discriminator():
    return keras.Sequential([
        layers.Flatten(input_shape=(28, 28, 1)),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(1, activation='sigmoid')
    ])

generator = build_generator()
discriminator = build_discriminator()

print(f"Generator params: {generator.count_params():,}")
print(f"Discriminator params: {discriminator.count_params():,}")

# Generate sample
noise = np.random.randn(1, 100)
fake_image = generator.predict(noise, verbose=0)
print(f"Generated image shape: {fake_image.shape}")
`
    },
    {
      title: 'Style Transfer & Image Enhancement',
      description: `
## Style Transfer & Image Enhancement

### Overview
Style transfer applies the artistic style of one image to the content of another. Neural style transfer uses deep learning to separate and recombine content and style, creating artistic images.

### Key Concepts

**Neural Style Transfer**:
- Content representation: High-level features
- Style representation: Gram matrices of features
- Loss function: Content loss + Style loss
- Optimization: Iteratively update image

**Fast Style Transfer**:
- Feed-forward network: Single pass
- Pre-trained on specific styles
- Real-time performance
- Instance normalization

**Image Enhancement**:
- Super-resolution: Increase resolution
- Denoising: Remove noise
- Colorization: Add color to grayscale
- Inpainting: Fill missing regions

**Architectures**:
- VGG for feature extraction
- Perceptual loss: Feature-space comparison
- SRGAN: Super-resolution GAN
- Pix2Pix: Paired image translation

**Applications**:
- Artistic image generation
- Photo editing and filters
- Video enhancement
- Medical image improvement
- Satellite imagery enhancement

### Problem Statement
1. Implement neural style transfer
2. Extract content and style features
3. Optimize combined loss
4. Generate stylized images
5. Compare different styles

### Expected Output
- Stylized images with different styles
- Loss curves during optimization
- Content vs style trade-off
- Real-time style transfer results
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow import keras
from tensorflow.keras.applications import vgg19

# TODO: Load VGG19 for feature extraction
vgg = vgg19.VGG19(weights='imagenet', include_top=False)

# TODO: Define content and style layers
content_layers = ['block5_conv2']
style_layers = [
    'block1_conv1',
    'block2_conv1',
    'block3_conv1',
    'block4_conv1',
    'block5_conv1'
]

# TODO: Create feature extractor
def get_feature_extractor():
    outputs = [vgg.get_layer(name).output for name in content_layers + style_layers]
    model = keras.Model(vgg.input, outputs)
    model.trainable = False
    return model

# TODO: Compute Gram matrix for style
def gram_matrix(tensor):
    # Reshape to (height*width, channels)
    channels = tensor.shape[-1]
    a = keras.backend.reshape(tensor, [-1, channels])
    n = keras.backend.shape(a)[0]
    gram = keras.backend.dot(keras.backend.transpose(a), a)
    return gram / keras.backend.cast(n, keras.backend.floatx())

# TODO: Style transfer loss
def style_content_loss(outputs, content_targets, style_targets):
    content_outputs = outputs[:len(content_layers)]
    style_outputs = outputs[len(content_layers):]
    
    # Content loss
    content_loss = keras.backend.mean(
        keras.backend.square(content_outputs[0] - content_targets[0])
    )
    
    # Style loss
    style_loss = 0
    for output, target in zip(style_outputs, style_targets):
        style_loss += keras.backend.mean(
            keras.backend.square(gram_matrix(output) - gram_matrix(target))
        )
    
    return content_loss + style_loss * 1e-2

# Create sample images
content_img = np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8)
style_img = np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8)

# Add patterns
for i in range(0, 224, 20):
    content_img[i:i+10, :] = [100, 150, 200]  # Horizontal stripes
    style_img[:, i:i+10] = [200, 100, 150]  # Vertical stripes

# Display
fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(content_img)
axes[0].set_title('Content Image')
axes[1].imshow(style_img)
axes[1].set_title('Style Image')

# Simulated stylized result (blend)
stylized = (content_img * 0.6 + style_img * 0.4).astype(np.uint8)
axes[2].imshow(stylized)
axes[2].set_title('Stylized Result (Simulated)')

for ax in axes:
    ax.axis('off')
plt.tight_layout()
plt.show()

print("Style Transfer Concept:")
print("- Content: High-level structure from content image")
print("- Style: Textures and patterns from style image")
print("- Result: Content with style applied")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import gaussian_filter

def create_content_image():
    """Create content image with geometric shapes"""
    img = np.ones((224, 224, 3), dtype=np.uint8) * 255
    # Draw shapes
    img[50:100, 50:150] = [100, 150, 200]  # Rectangle
    for i in range(224):
        for j in range(224):
            if (i-170)**2 + (j-170)**2 < 40**2:
                img[i, j] = [200, 100, 150]  # Circle
    return img

def create_style_image(style_type='waves'):
    """Create style image with patterns"""
    img = np.zeros((224, 224, 3), dtype=np.uint8)
    
    if style_type == 'waves':
        for i in range(224):
            for j in range(224):
                val = int(127 + 127 * np.sin(i * 0.1) * np.cos(j * 0.1))
                img[i, j] = [val, 255-val, val]
    elif style_type == 'stripes':
        for i in range(0, 224, 15):
            img[i:i+7, :] = [255, 100, 100]
            img[i+7:i+15, :] = [100, 100, 255]
    elif style_type == 'dots':
        for i in range(0, 224, 20):
            for j in range(0, 224, 20):
                img[i:i+10, j:j+10] = [255, 200, 100]
    
    return img

def apply_style_transfer(content, style, alpha=0.6):
    """Simplified style transfer simulation"""
    # Extract edges from content
    content_gray = np.mean(content, axis=2)
    edges = np.abs(np.gradient(content_gray)[0]) + np.abs(np.gradient(content_gray)[1])
    edges = (edges / edges.max() * 255).astype(np.uint8)
    
    # Apply style colors
    stylized = np.zeros_like(content)
    for c in range(3):
        # Blend content structure with style colors
        style_filtered = gaussian_filter(style[:, :, c].astype(float), sigma=2)
        stylized[:, :, c] = (
            alpha * content[:, :, c] + 
            (1 - alpha) * style_filtered
        ).astype(np.uint8)
    
    # Enhance edges
    for c in range(3):
        stylized[:, :, c] = np.clip(
            stylized[:, :, c] + edges * 0.3, 0, 255
        ).astype(np.uint8)
    
    return stylized

# Create images
content = create_content_image()
styles = {
    'Waves': create_style_image('waves'),
    'Stripes': create_style_image('stripes'),
    'Dots': create_style_image('dots')
}

# Apply style transfer
results = {}
for name, style in styles.items():
    results[name] = apply_style_transfer(content, style, alpha=0.6)

# Display
fig, axes = plt.subplots(2, 4, figsize=(16, 8))

axes[0, 0].imshow(content)
axes[0, 0].set_title('Content Image', fontweight='bold')
axes[0, 0].axis('off')

for idx, (name, style) in enumerate(styles.items(), 1):
    axes[0, idx].imshow(style)
    axes[0, idx].set_title(f'Style: {name}', fontweight='bold')
    axes[0, idx].axis('off')

axes[1, 0].text(0.5, 0.5, 'Stylized\\nResults →', 
               ha='center', va='center', fontsize=14, fontweight='bold',
               transform=axes[1, 0].transAxes)
axes[1, 0].axis('off')

for idx, (name, result) in enumerate(results.items(), 1):
    axes[1, idx].imshow(result)
    axes[1, idx].set_title(f'Content + {name}', fontweight='bold')
    axes[1, idx].axis('off')

plt.suptitle('Neural Style Transfer: Applying Artistic Styles', 
            fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\nStyle Transfer Results:")
print("="*50)
print("Content: Geometric shapes (structure preserved)")
print("\\nStyles Applied:")
for name in styles.keys():
    print(f"  - {name}: Texture and color patterns transferred")
print("\\nKey Concepts:")
print("  - Content loss: Preserves high-level structure")
print("  - Style loss: Captures textures via Gram matrices")
print("  - Balance: α controls content vs style trade-off")
`,
      code: `import numpy as np
from scipy.ndimage import gaussian_filter

def create_content():
    img = np.ones((224, 224, 3), dtype=np.uint8) * 255
    img[50:100, 50:150] = [100, 150, 200]
    return img

def create_style():
    img = np.zeros((224, 224, 3), dtype=np.uint8)
    for i in range(224):
        for j in range(224):
            val = int(127 + 127 * np.sin(i * 0.1) * np.cos(j * 0.1))
            img[i, j] = [val, 255-val, val]
    return img

def style_transfer(content, style, alpha=0.6):
    stylized = np.zeros_like(content)
    for c in range(3):
        style_filtered = gaussian_filter(style[:, :, c].astype(float), 2)
        stylized[:, :, c] = (alpha * content[:, :, c] + (1-alpha) * style_filtered).astype(np.uint8)
    return stylized

content = create_content()
style = create_style()
result = style_transfer(content, style)

print(f"Content shape: {content.shape}")
print(f"Style shape: {style.shape}")
print(f"Result shape: {result.shape}")
`
    },
    {
      title: 'Image Captioning & Visual Question Answering',
      description: `
## Image Captioning & Visual QA

### Overview
Image captioning generates natural language descriptions of images, while Visual Question Answering (VQA) answers questions about image content. Both combine computer vision with natural language processing.

### Key Concepts

**Image Captioning Architecture**:
- CNN encoder: Extract visual features
- RNN decoder: Generate text sequence
- Attention mechanism: Focus on relevant regions
- Beam search: Find best caption

**Popular Models**:
- Show and Tell: CNN + LSTM
- Show, Attend and Tell: Attention-based
- Transformer-based: CLIP, BLIP, Flamingo
- Vision-Language models: GPT-4V, LLaVA

**Visual Question Answering**:
- Image understanding + question comprehension
- Multi-modal fusion: Combine vision and language
- Answer types: Yes/No, counting, object recognition
- Reasoning: Spatial, logical, common sense

**Evaluation Metrics**:
- BLEU: N-gram overlap
- METEOR: Considers synonyms
- CIDEr: Consensus-based
- SPICE: Semantic similarity

**Applications**:
- Accessibility (screen readers)
- Content moderation
- Image search and retrieval
- Medical image reporting
- Autonomous systems

### Problem Statement
1. Generate image captions
2. Answer questions about images
3. Implement attention mechanism
4. Evaluate caption quality
5. Build visual reasoning system

### Expected Output
- Generated captions for images
- VQA answers with confidence
- Attention visualization
- Evaluation metrics
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt

# Simulated image features and captions
class SimpleImageCaptioner:
    def __init__(self):
        # Simulated vocabulary
        self.vocab = [
            'a', 'person', 'dog', 'cat', 'car', 'tree', 'house',
            'standing', 'sitting', 'running', 'in', 'on', 'near',
            'the', 'with', 'and'
        ]
        self.word_to_idx = {w: i for i, w in enumerate(self.vocab)}
        
    def extract_features(self, image):
        """Simulate CNN feature extraction"""
        # In practice: use pre-trained CNN
        features = np.mean(image, axis=(0, 1))  # Simple color features
        return features
    
    def generate_caption(self, features):
        """Simulate caption generation"""
        # Rule-based for demonstration
        # In practice: use LSTM/Transformer decoder
        
        if features[0] > 150:  # Reddish
            objects = ['person', 'car']
        elif features[1] > 150:  # Greenish
            objects = ['tree', 'dog']
        else:  # Bluish
            objects = ['house', 'cat']
        
        actions = ['standing', 'sitting', 'running']
        
        caption = f"a {np.random.choice(objects)} {np.random.choice(actions)} near the {np.random.choice(['tree', 'house'])}"
        return caption

# TODO: Create sample images
images = {
    'red_scene': np.ones((224, 224, 3), dtype=np.uint8) * [200, 100, 100],
    'green_scene': np.ones((224, 224, 3), dtype=np.uint8) * [100, 200, 100],
    'blue_scene': np.ones((224, 224, 3), dtype=np.uint8) * [100, 100, 200]
}

# Add simple objects
for name, img in images.items():
    # Add a rectangle (simulated object)
    img[80:140, 80:140] = [255, 255, 255]

# TODO: Generate captions
captioner = SimpleImageCaptioner()
captions = {}

for name, img in images.items():
    features = captioner.extract_features(img)
    caption = captioner.generate_caption(features)
    captions[name] = caption

# TODO: Visual Question Answering
class SimpleVQA:
    def answer_question(self, image, question):
        """Simulate VQA"""
        features = np.mean(image, axis=(0, 1))
        
        if 'color' in question.lower():
            if features[0] > 150:
                return 'red', 0.85
            elif features[1] > 150:
                return 'green', 0.82
            else:
                return 'blue', 0.88
        elif 'how many' in question.lower():
            return '1', 0.75
        else:
            return 'yes', 0.70

vqa = SimpleVQA()

# Display results
fig, axes = plt.subplots(2, 3, figsize=(15, 10))

for idx, (name, img) in enumerate(images.items()):
    ax = axes[0, idx]
    ax.imshow(img)
    ax.set_title(f'{name.replace("_", " ").title()}')
    ax.axis('off')
    
    # Add caption
    ax.text(0.5, -0.1, f'Caption: {captions[name]}',
           ha='center', transform=ax.transAxes,
           fontsize=9, style='italic')

# VQA examples
questions = [
    'What color is the scene?',
    'How many objects are there?',
    'Is there a white rectangle?'
]

for idx, (name, img) in enumerate(images.items()):
    ax = axes[1, idx]
    ax.axis('off')
    
    qa_text = f"Image: {name}\\n\\n"
    for q in questions[:2]:  # Show 2 questions
        answer, conf = vqa.answer_question(img, q)
        qa_text += f"Q: {q}\\nA: {answer} ({conf:.0%})\\n\\n"
    
    ax.text(0.1, 0.9, qa_text, transform=ax.transAxes,
           fontsize=9, verticalalignment='top',
           bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

plt.suptitle('Image Captioning & Visual Question Answering',
            fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\nImage Captioning Results:")
for name, caption in captions.items():
    print(f"{name}: {caption}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt

class ImageCaptioner:
    def __init__(self):
        self.vocab = [
            'a', 'the', 'person', 'dog', 'cat', 'car', 'tree', 'house', 'building',
            'standing', 'sitting', 'running', 'walking', 'in', 'on', 'near', 'with',
            'red', 'green', 'blue', 'white', 'black', 'large', 'small'
        ]
        self.templates = [
            "a {object} {action} near a {location}",
            "a {color} {object} in the {location}",
            "a {size} {object} {action} on the {surface}"
        ]
    
    def extract_features(self, image):
        # Color features
        mean_color = np.mean(image, axis=(0, 1))
        # Texture features (simplified)
        texture = np.std(image, axis=(0, 1))
        return {'color': mean_color, 'texture': texture}
    
    def generate_caption(self, features):
        color_map = {0: 'red', 1: 'green', 2: 'blue'}
        dominant_color = color_map[np.argmax(features['color'])]
        
        objects = ['person', 'car', 'building']
        actions = ['standing', 'sitting', 'moving']
        locations = ['street', 'park', 'building']
        
        template = np.random.choice(self.templates)
        caption = template.format(
            object=np.random.choice(objects),
            action=np.random.choice(actions),
            location=np.random.choice(locations),
            color=dominant_color,
            size='large',
            surface='ground'
        )
        return caption, 0.85

class VisualQA:
    def __init__(self):
        self.question_types = {
            'color': ['color', 'what color'],
            'count': ['how many', 'number of'],
            'object': ['what is', 'what are'],
            'location': ['where', 'location'],
            'yesno': ['is there', 'are there', 'does']
        }
    
    def classify_question(self, question):
        q_lower = question.lower()
        for qtype, keywords in self.question_types.items():
            if any(kw in q_lower for kw in keywords):
                return qtype
        return 'other'
    
    def answer(self, image, question):
        features = np.mean(image, axis=(0, 1))
        qtype = self.classify_question(question)
        
        if qtype == 'color':
            colors = ['red', 'green', 'blue']
            color_idx = np.argmax(features)
            return colors[color_idx], 0.88
        elif qtype == 'count':
            # Simulate object detection
            return str(np.random.randint(1, 4)), 0.75
        elif qtype == 'yesno':
            return np.random.choice(['yes', 'no']), 0.82
        elif qtype == 'object':
            objects = ['person', 'car', 'building', 'tree']
            return np.random.choice(objects), 0.79
        else:
            return 'unknown', 0.50

# Create test images
def create_scene(color_theme):
    img = np.ones((224, 224, 3), dtype=np.uint8)
    if color_theme == 'red':
        img[:, :] = [200, 100, 100]
    elif color_theme == 'green':
        img[:, :] = [100, 200, 100]
    else:
        img[:, :] = [100, 100, 200]
    
    # Add objects
    img[80:140, 80:140] = [255, 255, 255]  # White square
    img[100:120, 160:180] = [50, 50, 50]  # Dark rectangle
    return img

scenes = {
    'Urban Scene': create_scene('red'),
    'Park Scene': create_scene('green'),
    'Sky Scene': create_scene('blue')
}

# Generate captions
captioner = ImageCaptioner()
vqa = VisualQA()

fig, axes = plt.subplots(3, 3, figsize=(15, 12))

for idx, (name, img) in enumerate(scenes.items()):
    # Show image
    axes[idx, 0].imshow(img)
    axes[idx, 0].set_title(name, fontweight='bold')
    axes[idx, 0].axis('off')
    
    # Generate caption
    features = captioner.extract_features(img)
    caption, cap_conf = captioner.generate_caption(features)
    
    axes[idx, 1].axis('off')
    axes[idx, 1].text(0.1, 0.9, f"Generated Caption:\\n\\n{caption}\\n\\nConfidence: {cap_conf:.0%}",
                     transform=axes[idx, 1].transAxes, fontsize=10,
                     verticalalignment='top', wrap=True,
                     bbox=dict(boxstyle='round', facecolor='lightblue', alpha=0.7))
    
    # VQA
    questions = [
        "What color is dominant?",
        "How many objects are visible?",
        "Is there a white square?"
    ]
    
    axes[idx, 2].axis('off')
    qa_text = "Visual QA:\\n\\n"
    for q in questions:
        answer, conf = vqa.answer(img, q)
        qa_text += f"Q: {q}\\nA: {answer} ({conf:.0%})\\n\\n"
    
    axes[idx, 2].text(0.1, 0.9, qa_text, transform=axes[idx, 2].transAxes,
                     fontsize=9, verticalalignment='top',
                     bbox=dict(boxstyle='round', facecolor='lightgreen', alpha=0.7))

plt.suptitle('Image Captioning & Visual Question Answering System',
            fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\nMulti-Modal Vision-Language System")
print("="*50)
print("\\nCapabilities:")
print("  - Image Captioning: Generate natural language descriptions")
print("  - Visual QA: Answer questions about image content")
print("  - Multi-modal Fusion: Combine vision and language understanding")
print("\\nApplications:")
print("  - Accessibility (screen readers)")
print("  - Content moderation")
print("  - Image search")
print("  - Medical reporting")
`,
      code: `import numpy as np

class SimpleCaptioner:
    def caption(self, image):
        color = np.mean(image, axis=(0, 1))
        colors = ['red', 'green', 'blue']
        dominant = colors[np.argmax(color)]
        return f"a {dominant} scene with objects"

class SimpleVQA:
    def answer(self, image, question):
        if 'color' in question.lower():
            color = np.mean(image, axis=(0, 1))
            return ['red', 'green', 'blue'][np.argmax(color)]
        return 'yes'

img = np.ones((224, 224, 3), dtype=np.uint8) * [200, 100, 100]
captioner = SimpleCaptioner()
vqa = SimpleVQA()

print(f"Caption: {captioner.caption(img)}")
print(f"Q: What color? A: {vqa.answer(img, 'What color?')}")
`
    },
    {
      title: 'OCR & Document Analysis',
      description: `
## Optical Character Recognition & Document Analysis

### Overview
OCR extracts text from images and documents, enabling digitization and automated processing. Modern OCR combines text detection, recognition, and layout analysis for comprehensive document understanding.

### Key Concepts

**OCR Pipeline**:
- Text detection: Locate text regions
- Text recognition: Convert pixels to characters
- Post-processing: Spell check, formatting
- Layout analysis: Understand document structure

**Text Detection Methods**:
- EAST: Efficient and Accurate Scene Text
- CRAFT: Character Region Awareness
- TextBoxes: Oriented text detection
- DBNet: Differentiable Binarization

**Text Recognition**:
- Tesseract: Traditional OCR engine
- EasyOCR: Deep learning-based
- PaddleOCR: Production-ready system
- TrOCR: Transformer-based OCR

**Document Analysis**:
- Layout detection: Headers, paragraphs, tables
- Table extraction: Structure recognition
- Form processing: Field extraction
- Handwriting recognition: Cursive text

**Applications**:
- Document digitization
- License plate recognition
- Receipt and invoice processing
- Historical document preservation
- Accessibility (text-to-speech)

### Problem Statement
1. Detect text regions in images
2. Recognize characters and words
3. Extract structured information
4. Handle different fonts and orientations
5. Process real-world documents

### Expected Output
- Detected text bounding boxes
- Recognized text with confidence scores
- Structured document layout
- Extracted key-value pairs
`,
      starterCode: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# Simulate text detection and recognition
class SimpleOCR:
    def __init__(self):
        self.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    
    def detect_text_regions(self, image):
        """Detect text regions using simple thresholding"""
        # TODO: Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # TODO: Apply threshold
        _, binary = cv2.threshold(gray, , , cv2.THRESH_BINARY_INV)
        
        # TODO: Find contours
        contours, _ = cv2.findContours(
            binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
        )
        
        # TODO: Filter contours by size
        text_regions = []
        for contour in contours:
            x, y, w, h = cv2.boundingRect(contour)
            if w > 10 and h > 10:  # Minimum size
                text_regions.append((x, y, w, h))
        
        return text_regions
    
    def recognize_text(self, image, region):
        """Simulate text recognition"""
        # In practice: use Tesseract or deep learning model
        x, y, w, h = region
        
        # Simple simulation based on region size
        if w > 100:
            return "DOCUMENT", 0.95
        elif w > 50:
            return "TEXT", 0.88
        else:
            return "A", 0.75

# TODO: Create sample document image
doc_image = np.ones((400, 600, 3), dtype=np.uint8) * 255

# Add text-like rectangles
cv2.rectangle(doc_image, (50, 50), (550, 100), (0, 0, 0), -1)  # Title
cv2.rectangle(doc_image, (50, 150), (300, 180), (0, 0, 0), -1)  # Line 1
cv2.rectangle(doc_image, (50, 200), (400, 230), (0, 0, 0), -1)  # Line 2
cv2.rectangle(doc_image, (50, 250), (350, 280), (0, 0, 0), -1)  # Line 3

# TODO: Detect text regions
ocr = SimpleOCR()
regions = ocr.detect_text_regions(doc_image)

# TODO: Draw bounding boxes
result_image = doc_image.copy()
recognized_text = []

for region in regions:
    x, y, w, h = region
    cv2.rectangle(result_image, (x, y), (x+w, y+h), (0, 255, 0), 2)
    
    # Recognize text
    text, confidence = ocr.recognize_text(doc_image, region)
    recognized_text.append((text, confidence))
    
    # Add label
    cv2.putText(result_image, f"{text} ({confidence:.0%})", 
               (x, y-5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

# Display results
fig, axes = plt.subplots(1, 2, figsize=(12, 6))

axes[0].imshow(cv2.cvtColor(doc_image, cv2.COLOR_BGR2RGB))
axes[0].set_title('Original Document')
axes[0].axis('off')

axes[1].imshow(cv2.cvtColor(result_image, cv2.COLOR_BGR2RGB))
axes[1].set_title(f'OCR Results ({len(regions)} regions detected)')
axes[1].axis('off')

plt.tight_layout()
plt.show()

print(f"\\nOCR Results:")
print(f"Detected {len(regions)} text regions")
for i, (text, conf) in enumerate(recognized_text, 1):
    print(f"  Region {i}: '{text}' (confidence: {conf:.0%})")
`,
      solution: `import cv2
import numpy as np
import matplotlib.pyplot as plt

class DocumentOCR:
    def __init__(self):
        self.min_text_width = 10
        self.min_text_height = 10
    
    def detect_text_regions(self, image):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
        
        # Morphological operations to connect text
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 3))
        dilated = cv2.dilate(binary, kernel, iterations=1)
        
        contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        text_regions = []
        for contour in contours:
            x, y, w, h = cv2.boundingRect(contour)
            if w > self.min_text_width and h > self.min_text_height:
                text_regions.append((x, y, w, h))
        
        # Sort by y-coordinate (top to bottom)
        text_regions.sort(key=lambda r: r[1])
        return text_regions
    
    def recognize_text(self, image, region):
        x, y, w, h = region
        roi = image[y:y+h, x:x+w]
        
        # Simulate recognition based on region characteristics
        aspect_ratio = w / h if h > 0 else 0
        
        if aspect_ratio > 8:
            return "DOCUMENT TITLE", 0.95
        elif aspect_ratio > 5:
            return "This is a line of text", 0.88
        elif aspect_ratio > 3:
            return "Short text", 0.85
        else:
            return "A", 0.75
    
    def analyze_layout(self, regions):
        """Analyze document layout"""
        layout = {
            'title': [],
            'body': [],
            'footer': []
        }
        
        if not regions:
            return layout
        
        # Simple heuristic: first region is title
        if regions:
            layout['title'].append(regions[0])
        
        # Middle regions are body
        if len(regions) > 2:
            layout['body'] = regions[1:-1]
        
        # Last region is footer
        if len(regions) > 1:
            layout['footer'].append(regions[-1])
        
        return layout

# Create realistic document
doc_image = np.ones((500, 700, 3), dtype=np.uint8) * 255

# Title
cv2.rectangle(doc_image, (100, 50), (600, 90), (0, 0, 0), -1)
cv2.putText(doc_image, 'DOCUMENT', (250, 75), cv2.FONT_HERSHEY_BOLD, 1, (255, 255, 255), 2)

# Body text
lines = [
    (100, 150, 500, 170),
    (100, 190, 550, 210),
    (100, 230, 480, 250),
    (100, 270, 520, 290),
]
for x1, y1, x2, y2 in lines:
    cv2.rectangle(doc_image, (x1, y1), (x2, y2), (0, 0, 0), -1)

# Footer
cv2.rectangle(doc_image, (100, 400), (300, 420), (0, 0, 0), -1)

# Perform OCR
ocr = DocumentOCR()
regions = ocr.detect_text_regions(doc_image)
layout = ocr.analyze_layout(regions)

# Visualize results
result_image = doc_image.copy()
colors = {
    'title': (255, 0, 0),    # Red
    'body': (0, 255, 0),     # Green
    'footer': (0, 0, 255)    # Blue
}

all_text = []
for section, section_regions in layout.items():
    for region in section_regions:
        x, y, w, h = region
        color = colors.get(section, (0, 255, 0))
        cv2.rectangle(result_image, (x, y), (x+w, y+h), color, 2)
        
        text, conf = ocr.recognize_text(doc_image, region)
        all_text.append((section, text, conf))
        
        cv2.putText(result_image, section.upper(), (x, y-5),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.4, color, 1)

# Display
fig, axes = plt.subplots(1, 3, figsize=(15, 6))

axes[0].imshow(cv2.cvtColor(doc_image, cv2.COLOR_BGR2RGB))
axes[0].set_title('Original Document')
axes[0].axis('off')

axes[1].imshow(cv2.cvtColor(result_image, cv2.COLOR_BGR2RGB))
axes[1].set_title(f'OCR Detection ({len(regions)} regions)')
axes[1].axis('off')

# Text output
axes[2].axis('off')
output_text = "Extracted Text:\\n\\n"
for section, text, conf in all_text:
    output_text += f"[{section.upper()}]\\n{text}\\n({conf:.0%} confidence)\\n\\n"

axes[2].text(0.1, 0.9, output_text, transform=axes[2].transAxes,
            fontsize=9, verticalalignment='top', family='monospace',
            bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

plt.tight_layout()
plt.show()

print("\\nOCR & Document Analysis Results:")
print("="*50)
print(f"Total regions detected: {len(regions)}")
print(f"\\nLayout Analysis:")
for section, section_regions in layout.items():
    print(f"  {section.capitalize()}: {len(section_regions)} region(s)")
print(f"\\nExtracted Text:")
for section, text, conf in all_text:
    print(f"  [{section}] {text} ({conf:.0%})")
`,
      code: `import cv2
import numpy as np

class SimpleOCR:
    def detect_text(self, image):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
        contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        regions = []
        for contour in contours:
            x, y, w, h = cv2.boundingRect(contour)
            if w > 10 and h > 10:
                regions.append((x, y, w, h))
        return regions

# Create document
doc = np.ones((400, 600, 3), dtype=np.uint8) * 255
cv2.rectangle(doc, (50, 50), (550, 100), (0, 0, 0), -1)
cv2.rectangle(doc, (50, 150), (400, 180), (0, 0, 0), -1)

ocr = SimpleOCR()
regions = ocr.detect_text(doc)
print(f"Detected {len(regions)} text regions")
for i, (x, y, w, h) in enumerate(regions, 1):
    print(f"  Region {i}: ({x}, {y}) size {w}x{h}")
`
    },
    {
      title: 'Medical Image Analysis',
      description: `
## Medical Image Analysis

### Overview
Medical image analysis applies computer vision to healthcare, enabling automated diagnosis, treatment planning, and disease monitoring. It requires specialized techniques for handling medical imaging modalities and clinical requirements.

### Key Concepts

**Medical Imaging Modalities**:
- X-ray: Bone fractures, chest conditions
- CT (Computed Tomography): 3D cross-sections
- MRI (Magnetic Resonance Imaging): Soft tissue
- Ultrasound: Real-time imaging
- PET: Metabolic activity

**Key Tasks**:
- Classification: Disease present/absent
- Segmentation: Organ and tumor boundaries
- Detection: Lesion localization
- Registration: Align multiple scans
- Quantification: Measure volumes, densities

**Specialized Techniques**:
- U-Net: Medical image segmentation
- Transfer learning: Limited data
- Data augmentation: Rotations, flips, elastic deformations
- Class imbalance: Weighted loss, focal loss
- Explainability: Grad-CAM, attention maps

**Challenges**:
- Limited labeled data
- High annotation cost (expert radiologists)
- Class imbalance (rare diseases)
- High stakes (patient safety)
- Regulatory requirements (FDA approval)

**Applications**:
- Tumor detection and segmentation
- Organ segmentation for surgery planning
- Disease progression monitoring
- Treatment response assessment
- Automated screening programs

### Problem Statement
1. Load and preprocess medical images
2. Segment organs or tumors
3. Classify diseases
4. Visualize predictions with explanations
5. Evaluate clinical metrics

### Expected Output
- Segmentation masks overlaid on images
- Disease classification with confidence
- Attention maps showing decision regions
- Clinical metrics (Dice score, sensitivity, specificity)
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import gaussian_filter

# Simulate medical image (CT scan)
def create_medical_image():
    """Create synthetic medical image"""
    img = np.ones((256, 256), dtype=np.float32) * 0.3
    
    # TODO: Add organ (circular region)
    y, x = np.ogrid[:256, :256]
    organ_mask = (x - 128)**2 + (y - 128)**2 < 60**2
    img[organ_mask] = 0.6
    
    # TODO: Add tumor (smaller bright region)
    tumor_mask = (x - 140)**2 + (y - 110)**2 < 15**2
    img[tumor_mask] = 0.9
    
    # TODO: Add noise
    noise = np.random.normal(0, 0.05, img.shape)
    img = np.clip(img + noise, 0, 1)
    
    return img, organ_mask, tumor_mask

# TODO: Simple segmentation using thresholding
def segment_medical_image(image, threshold=0.7):
    """Segment bright regions (tumors)"""
    # Apply Gaussian smoothing
    smoothed = gaussian_filter(image, sigma=2)
    
    # Threshold
    segmentation = smoothed > threshold
    
    return segmentation

# TODO: Calculate Dice coefficient
def dice_coefficient(pred, target):
    """Dice similarity coefficient"""
    intersection = np.sum(pred * target)
    union = np.sum(pred) + np.sum(target)
    
    if union == 0:
        return 1.0
    
    dice = (2.0 * intersection) / union
    return dice

# Create medical image
medical_img, organ_gt, tumor_gt = create_medical_image()

# Perform segmentation
tumor_pred = segment_medical_image(medical_img, threshold=0.7)

# Calculate metrics
dice = dice_coefficient(tumor_pred, tumor_gt)

# TODO: Create attention map (simulate Grad-CAM)
attention_map = gaussian_filter(medical_img, sigma=5)
attention_map = (attention_map - attention_map.min()) / (attention_map.max() - attention_map.min())

# Display results
fig, axes = plt.subplots(2, 3, figsize=(15, 10))

axes[0, 0].imshow(medical_img, cmap='gray')
axes[0, 0].set_title('Medical Image (CT Scan)')
axes[0, 0].axis('off')

axes[0, 1].imshow(tumor_gt, cmap='Reds', alpha=0.7)
axes[0, 1].set_title('Ground Truth (Tumor)')
axes[0, 1].axis('off')

axes[0, 2].imshow(tumor_pred, cmap='Greens', alpha=0.7)
axes[0, 2].set_title(f'Prediction (Dice: {dice:.3f})')
axes[0, 2].axis('off')

# Overlay
axes[1, 0].imshow(medical_img, cmap='gray')
axes[1, 0].contour(tumor_gt, colors='red', linewidths=2, levels=[0.5])
axes[1, 0].contour(tumor_pred, colors='green', linewidths=2, levels=[0.5])
axes[1, 0].set_title('Overlay (Red=GT, Green=Pred)')
axes[1, 0].axis('off')

# Attention map
axes[1, 1].imshow(medical_img, cmap='gray')
axes[1, 1].imshow(attention_map, cmap='jet', alpha=0.5)
axes[1, 1].set_title('Attention Map (Grad-CAM)')
axes[1, 1].axis('off')

# Metrics
axes[1, 2].axis('off')
metrics_text = f"""
Medical Image Analysis

Metrics:
  Dice Coefficient: {dice:.3f}
  Sensitivity: {np.sum(tumor_pred * tumor_gt) / np.sum(tumor_gt):.3f}
  Specificity: {np.sum((1-tumor_pred) * (1-tumor_gt)) / np.sum(1-tumor_gt):.3f}

Tumor Size:
  Ground Truth: {np.sum(tumor_gt)} pixels
  Predicted: {np.sum(tumor_pred)} pixels

Clinical Decision:
  {'Tumor Detected' if dice > 0.5 else 'No Significant Finding'}
"""
axes[1, 2].text(0.1, 0.9, metrics_text, transform=axes[1, 2].transAxes,
               fontsize=10, verticalalignment='top', family='monospace',
               bbox=dict(boxstyle='round', facecolor='lightblue', alpha=0.7))

plt.tight_layout()
plt.show()

print(f"\\nMedical Image Analysis Results:")
print(f"Dice Coefficient: {dice:.3f}")
print(f"Clinical Interpretation: {'Positive' if dice > 0.5 else 'Negative'}")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import gaussian_filter, binary_erosion, binary_dilation

def create_medical_image(image_type='ct'):
    img = np.ones((256, 256), dtype=np.float32) * 0.3
    
    y, x = np.ogrid[:256, :256]
    
    # Organ
    organ_mask = (x - 128)**2 + (y - 128)**2 < 60**2
    img[organ_mask] = 0.6
    
    # Tumor
    tumor_mask = (x - 140)**2 + (y - 110)**2 < 15**2
    img[tumor_mask] = 0.9
    
    # Additional lesion
    lesion_mask = (x - 100)**2 + (y - 140)**2 < 10**2
    img[lesion_mask] = 0.85
    
    # Realistic noise
    noise = np.random.normal(0, 0.05, img.shape)
    img = np.clip(img + noise, 0, 1)
    
    # Simulate CT artifacts
    img = gaussian_filter(img, sigma=0.5)
    
    return img, organ_mask, tumor_mask | lesion_mask

def unet_segmentation(image, threshold=0.7):
    """Simulate U-Net segmentation"""
    # Multi-scale processing
    smoothed1 = gaussian_filter(image, sigma=1)
    smoothed2 = gaussian_filter(image, sigma=2)
    smoothed3 = gaussian_filter(image, sigma=4)
    
    # Combine scales
    combined = (smoothed1 + smoothed2 + smoothed3) / 3
    
    # Threshold
    segmentation = combined > threshold
    
    # Morphological post-processing
    segmentation = binary_erosion(segmentation, iterations=1)
    segmentation = binary_dilation(segmentation, iterations=2)
    
    return segmentation

def calculate_metrics(pred, target):
    """Calculate clinical metrics"""
    pred = pred.astype(bool)
    target = target.astype(bool)
    
    tp = np.sum(pred & target)
    fp = np.sum(pred & ~target)
    fn = np.sum(~pred & target)
    tn = np.sum(~pred & ~target)
    
    dice = (2 * tp) / (2 * tp + fp + fn) if (2 * tp + fp + fn) > 0 else 0
    sensitivity = tp / (tp + fn) if (tp + fn) > 0 else 0
    specificity = tn / (tn + fp) if (tn + fp) > 0 else 0
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    
    return {
        'dice': dice,
        'sensitivity': sensitivity,
        'specificity': specificity,
        'precision': precision
    }

def generate_gradcam(image, prediction):
    """Simulate Grad-CAM attention"""
    # Weighted combination of image and prediction
    attention = image * prediction
    attention = gaussian_filter(attention, sigma=5)
    attention = (attention - attention.min()) / (attention.max() - attention.min() + 1e-8)
    return attention

# Create medical image
medical_img, organ_gt, tumor_gt = create_medical_image()

# Perform segmentation
tumor_pred = unet_segmentation(medical_img, threshold=0.7)

# Calculate metrics
metrics = calculate_metrics(tumor_pred, tumor_gt)

# Generate attention map
attention = generate_gradcam(medical_img, tumor_pred.astype(float))

# Visualization
fig = plt.figure(figsize=(16, 10))

# Original image
ax1 = fig.add_subplot(2, 4, 1)
ax1.imshow(medical_img, cmap='gray')
ax1.set_title('CT Scan Image', fontweight='bold')
ax1.axis('off')

# Ground truth
ax2 = fig.add_subplot(2, 4, 2)
ax2.imshow(medical_img, cmap='gray')
ax2.imshow(tumor_gt, cmap='Reds', alpha=0.5)
ax2.set_title('Ground Truth Annotation', fontweight='bold')
ax2.axis('off')

# Prediction
ax3 = fig.add_subplot(2, 4, 3)
ax3.imshow(medical_img, cmap='gray')
ax3.imshow(tumor_pred, cmap='Greens', alpha=0.5)
ax3.set_title(f'AI Prediction\\nDice: {metrics["dice"]:.3f}', fontweight='bold')
ax3.axis('off')

# Overlay comparison
ax4 = fig.add_subplot(2, 4, 4)
ax4.imshow(medical_img, cmap='gray')
ax4.contour(tumor_gt, colors='red', linewidths=2, levels=[0.5], label='Ground Truth')
ax4.contour(tumor_pred, colors='lime', linewidths=2, levels=[0.5], label='Prediction')
ax4.set_title('Comparison Overlay', fontweight='bold')
ax4.legend(loc='upper right', fontsize=8)
ax4.axis('off')

# Attention map
ax5 = fig.add_subplot(2, 4, 5)
ax5.imshow(medical_img, cmap='gray')
ax5.imshow(attention, cmap='jet', alpha=0.6)
ax5.set_title('Grad-CAM Attention', fontweight='bold')
ax5.axis('off')

# 3D visualization (simulated)
ax6 = fig.add_subplot(2, 4, 6)
ax6.imshow(tumor_pred.astype(float) * medical_img, cmap='hot')
ax6.set_title('Segmented Region', fontweight='bold')
ax6.axis('off')

# Metrics
ax7 = fig.add_subplot(2, 4, 7)
ax7.axis('off')
metrics_text = f"""Clinical Metrics:

Dice Coefficient: {metrics['dice']:.3f}
Sensitivity (Recall): {metrics['sensitivity']:.3f}
Specificity: {metrics['specificity']:.3f}
Precision: {metrics['precision']:.3f}

Tumor Characteristics:
  GT Size: {np.sum(tumor_gt)} pixels
  Pred Size: {np.sum(tumor_pred)} pixels
  Overlap: {np.sum(tumor_pred & tumor_gt)} pixels

Clinical Decision:
  Status: {'POSITIVE' if metrics['dice'] > 0.5 else 'NEGATIVE'}
  Confidence: {metrics['dice']*100:.1f}%
"""
ax7.text(0.1, 0.9, metrics_text, transform=ax7.transAxes,
        fontsize=9, verticalalignment='top', family='monospace',
        bbox=dict(boxstyle='round', facecolor='lightcyan', alpha=0.8))

# Bar chart of metrics
ax8 = fig.add_subplot(2, 4, 8)
metric_names = list(metrics.keys())
metric_values = list(metrics.values())
bars = ax8.bar(metric_names, metric_values, color=['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'])
ax8.set_ylim(0, 1)
ax8.set_title('Performance Metrics', fontweight='bold')
ax8.set_ylabel('Score')
ax8.grid(axis='y', alpha=0.3)
for bar in bars:
    height = bar.get_height()
    ax8.text(bar.get_x() + bar.get_width()/2., height,
            f'{height:.2f}', ha='center', va='bottom', fontsize=9)

plt.suptitle('Medical Image Analysis: Tumor Segmentation', 
            fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\nMedical Image Analysis Report:")
print("="*60)
print(f"Modality: CT Scan")
print(f"Task: Tumor Segmentation")
print(f"\\nPerformance Metrics:")
for metric, value in metrics.items():
    print(f"  {metric.capitalize():15}: {value:.3f}")
print(f"\\nClinical Interpretation:")
print(f"  Finding: {'Tumor detected' if metrics['dice'] > 0.5 else 'No significant abnormality'}")
print(f"  Confidence: {metrics['dice']*100:.1f}%")
print(f"  Recommendation: {'Further clinical review recommended' if metrics['dice'] > 0.5 else 'Routine follow-up'}")
`,
      code: `import numpy as np
from scipy.ndimage import gaussian_filter

def create_medical_image():
    img = np.ones((256, 256)) * 0.3
    y, x = np.ogrid[:256, :256]
    tumor = (x-140)**2 + (y-110)**2 < 15**2
    img[tumor] = 0.9
    img += np.random.normal(0, 0.05, img.shape)
    return np.clip(img, 0, 1), tumor

def segment(image, threshold=0.7):
    smoothed = gaussian_filter(image, sigma=2)
    return smoothed > threshold

def dice_score(pred, target):
    intersection = np.sum(pred * target)
    return (2 * intersection) / (np.sum(pred) + np.sum(target))

img, tumor_gt = create_medical_image()
tumor_pred = segment(img)
dice = dice_score(tumor_pred, tumor_gt)

print(f"Dice Coefficient: {dice:.3f}")
print(f"Tumor pixels - GT: {np.sum(tumor_gt)}, Pred: {np.sum(tumor_pred)}")
`
    },
    {
      title: 'Autonomous Vehicles & Scene Understanding',
      description: `
## Autonomous Vehicles & Scene Understanding

### Overview
Autonomous vehicles require robust computer vision systems to understand complex driving scenes in real-time. This involves detecting lanes, traffic signs, vehicles, pedestrians, and understanding the 3D environment for safe navigation.

### Key Concepts

**Lane Detection**:
- Edge detection and Hough transforms
- Polynomial fitting for curved lanes
- Perspective transformation (bird's eye view)
- Lane departure warning systems
- Handling various lighting and weather conditions

**Traffic Sign Recognition**:
- Classification of traffic signs (stop, yield, speed limits)
- Detection in cluttered environments
- Handling occlusions and varying scales
- Real-time processing requirements
- Multi-country sign variations

**Object Detection for Driving**:
- Vehicle detection and classification
- Pedestrian detection and tracking
- Cyclist and motorcycle detection
- Distance estimation
- Collision prediction

**Semantic Segmentation**:
- Road segmentation
- Sidewalk and crosswalk detection
- Drivable area identification
- Free space estimation
- Multi-class scene parsing

**Sensor Fusion**:
- Camera + LiDAR integration
- Radar data fusion
- Multi-modal perception
- 3D bounding boxes
- Depth estimation

**Challenges**:
- Real-time processing (30+ FPS)
- Varying weather and lighting
- Occlusions and crowded scenes
- Safety-critical requirements
- Edge cases and rare events

### Problem Statement
1. Implement lane detection with Hough transforms
2. Detect and classify traffic signs
3. Perform multi-object detection (vehicles, pedestrians)
4. Segment drivable road areas
5. Estimate distances to obstacles
6. Create a complete driving scene understanding pipeline

### Expected Output
- Detected lane lines with overlay
- Classified traffic signs with bounding boxes
- Tracked vehicles and pedestrians
- Segmented road areas
- Distance estimates to objects
- Bird's eye view of the scene
`,
      starterCode: `import cv2
import numpy as np
import matplotlib.pyplot as plt
from scipy import ndimage

# TODO: Load driving scene image
img = cv2.imread('driving_scene.jpg')
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# TODO: Lane Detection - Convert to grayscale and apply edge detection
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, , )

# TODO: Define region of interest (ROI) for lane detection
height, width = gray.shape
roi_vertices = np.array([[(, height), (, height*0.6), 
                          (, height*0.6), (, height)]], dtype=np.int32)

# TODO: Apply ROI mask
mask = np.zeros_like(edges)
cv2.fillPoly(mask, roi_vertices, 255)
masked_edges = 

# TODO: Hough Line Transform for lane detection
lines = cv2.HoughLinesP(masked_edges, rho=, theta=np.pi/180, 
                        threshold=, minLineLength=, maxLineGap=)

# TODO: Draw detected lanes
lane_img = np.zeros_like(img_rgb)
if lines is not None:
    for line in lines:
        x1, y1, x2, y2 = line[0]
        cv2.line(lane_img, (x1, y1), (x2, y2), (0, 255, 0), 5)

# TODO: Traffic Sign Detection - Use color thresholding for red signs
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
lower_red1 = np.array([0, 100, 100])
upper_red1 = np.array([10, 255, 255])
lower_red2 = np.array([160, 100, 100])
upper_red2 = np.array([180, 255, 255])

mask_red1 = 
mask_red2 = 
mask_red = 

# TODO: Find contours of potential traffic signs
contours, _ = cv2.findContours(mask_red, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# TODO: Filter contours by area and circularity
sign_img = img_rgb.copy()
for contour in contours:
    area = cv2.contourArea(contour)
    if area > :  # Minimum area threshold
        # Draw bounding box
        x, y, w, h = cv2.boundingRect(contour)
        cv2.rectangle(sign_img, (x, y), (x+w, y+h), (255, 0, 0), 2)
        cv2.putText(sign_img, 'Sign', (x, y-10), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

# TODO: Road Segmentation - Simple threshold-based approach
gray_norm = gray / 255.0
road_mask = (gray_norm > ) & (gray_norm < )

# TODO: Visualize results
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes[0, 0].imshow(img_rgb)
axes[0, 0].set_title('Original Scene')
axes[0, 1].imshow(cv2.addWeighted(img_rgb, 0.8, lane_img, 1, 0))
axes[0, 1].set_title('Lane Detection')
axes[0, 2].imshow(sign_img)
axes[0, 2].set_title('Traffic Sign Detection')
axes[1, 0].imshow(edges, cmap='gray')
axes[1, 0].set_title('Edge Detection')
axes[1, 1].imshow(masked_edges, cmap='gray')
axes[1, 1].set_title('ROI Masked Edges')
axes[1, 2].imshow(road_mask, cmap='gray')
axes[1, 2].set_title('Road Segmentation')

for ax in axes.flat:
    ax.axis('off')
plt.tight_layout()
plt.show()
`,
      solution: `import cv2
import numpy as np
import matplotlib.pyplot as plt
from scipy import ndimage

# Load driving scene image (create synthetic if needed)
def create_driving_scene():
    """Create a synthetic driving scene for demonstration"""
    img = np.ones((480, 640, 3), dtype=np.uint8) * 100
    
    # Draw road
    cv2.rectangle(img, (0, 300), (640, 480), (80, 80, 80), -1)
    
    # Draw lane markings
    for i in range(0, 640, 40):
        cv2.rectangle(img, (i, 380), (i+20, 390), (255, 255, 255), -1)
    
    # Draw left lane
    cv2.line(img, (100, 480), (200, 300), (255, 255, 0), 3)
    # Draw right lane
    cv2.line(img, (540, 480), (440, 300), (255, 255, 0), 3)
    
    # Draw traffic sign (red circle)
    cv2.circle(img, (500, 150), 30, (0, 0, 255), -1)
    cv2.circle(img, (500, 150), 25, (255, 255, 255), -1)
    cv2.putText(img, '50', (485, 160), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2)
    
    # Draw vehicles
    cv2.rectangle(img, (300, 350), (360, 400), (0, 0, 200), -1)
    cv2.rectangle(img, (450, 320), (500, 360), (200, 0, 0), -1)
    
    return img

img = create_driving_scene()
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Lane Detection
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 50, 150)

# Define region of interest
height, width = gray.shape
roi_vertices = np.array([[(0, height), (width//2-50, height*0.6), 
                          (width//2+50, height*0.6), (width, height)]], dtype=np.int32)

# Apply ROI mask
mask = np.zeros_like(edges)
cv2.fillPoly(mask, roi_vertices, 255)
masked_edges = cv2.bitwise_and(edges, mask)

# Hough Line Transform
lines = cv2.HoughLinesP(masked_edges, rho=2, theta=np.pi/180, 
                        threshold=50, minLineLength=40, maxLineGap=100)

# Draw detected lanes
lane_img = np.zeros_like(img_rgb)
if lines is not None:
    for line in lines:
        x1, y1, x2, y2 = line[0]
        cv2.line(lane_img, (x1, y1), (x2, y2), (0, 255, 0), 5)

# Traffic Sign Detection
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
lower_red1 = np.array([0, 100, 100])
upper_red1 = np.array([10, 255, 255])
lower_red2 = np.array([160, 100, 100])
upper_red2 = np.array([180, 255, 255])

mask_red1 = cv2.inRange(hsv, lower_red1, upper_red1)
mask_red2 = cv2.inRange(hsv, lower_red2, upper_red2)
mask_red = cv2.bitwise_or(mask_red1, mask_red2)

# Find contours
contours, _ = cv2.findContours(mask_red, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Filter and draw traffic signs
sign_img = img_rgb.copy()
detected_signs = []
for contour in contours:
    area = cv2.contourArea(contour)
    if area > 500:
        x, y, w, h = cv2.boundingRect(contour)
        aspect_ratio = w / float(h)
        if 0.7 < aspect_ratio < 1.3:  # Circular signs
            cv2.rectangle(sign_img, (x, y), (x+w, y+h), (255, 0, 0), 2)
            cv2.putText(sign_img, 'Speed Limit', (x, y-10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)
            detected_signs.append({'type': 'speed_limit', 'bbox': (x, y, w, h)})

# Road Segmentation
gray_norm = gray / 255.0
road_mask = (gray_norm > 0.2) & (gray_norm < 0.5)

# Object Detection (simple color-based for vehicles)
vehicle_img = img_rgb.copy()
blue_mask = cv2.inRange(hsv, np.array([100, 50, 50]), np.array([130, 255, 255]))
red_mask_vehicle = cv2.inRange(hsv, np.array([0, 50, 50]), np.array([10, 255, 255]))

vehicle_contours, _ = cv2.findContours(
    cv2.bitwise_or(blue_mask, red_mask_vehicle), 
    cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
)

detected_vehicles = []
for contour in vehicle_contours:
    area = cv2.contourArea(contour)
    if area > 1000:
        x, y, w, h = cv2.boundingRect(contour)
        cv2.rectangle(vehicle_img, (x, y), (x+w, y+h), (0, 255, 255), 2)
        cv2.putText(vehicle_img, 'Vehicle', (x, y-10), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 2)
        detected_vehicles.append({'bbox': (x, y, w, h)})

# Visualize results
fig = plt.figure(figsize=(16, 10))

# Original scene
ax1 = fig.add_subplot(2, 3, 1)
ax1.imshow(img_rgb)
ax1.set_title('Original Driving Scene', fontweight='bold')
ax1.axis('off')

# Lane detection
ax2 = fig.add_subplot(2, 3, 2)
lane_overlay = cv2.addWeighted(img_rgb, 0.8, lane_img, 1, 0)
ax2.imshow(lane_overlay)
ax2.set_title(f'Lane Detection ({len(lines) if lines is not None else 0} lines)', fontweight='bold')
ax2.axis('off')

# Traffic sign detection
ax3 = fig.add_subplot(2, 3, 3)
ax3.imshow(sign_img)
ax3.set_title(f'Traffic Signs ({len(detected_signs)} detected)', fontweight='bold')
ax3.axis('off')

# Edge detection
ax4 = fig.add_subplot(2, 3, 4)
ax4.imshow(edges, cmap='gray')
ax4.set_title('Edge Detection (Canny)', fontweight='bold')
ax4.axis('off')

# Road segmentation
ax5 = fig.add_subplot(2, 3, 5)
ax5.imshow(road_mask, cmap='gray')
ax5.set_title('Road Segmentation', fontweight='bold')
ax5.axis('off')

# Vehicle detection
ax6 = fig.add_subplot(2, 3, 6)
ax6.imshow(vehicle_img)
ax6.set_title(f'Vehicle Detection ({len(detected_vehicles)} vehicles)', fontweight='bold')
ax6.axis('off')

plt.suptitle('Autonomous Vehicle Scene Understanding Pipeline', 
            fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\nAutonomous Driving Scene Analysis:")
print("="*60)
print(f"Lane Lines Detected: {len(lines) if lines is not None else 0}")
print(f"Traffic Signs Detected: {len(detected_signs)}")
print(f"Vehicles Detected: {len(detected_vehicles)}")
print(f"\\nDetected Objects:")
for i, sign in enumerate(detected_signs, 1):
    print(f"  Sign {i}: {sign['type']} at {sign['bbox']}")
for i, vehicle in enumerate(detected_vehicles, 1):
    print(f"  Vehicle {i}: at {vehicle['bbox']}")
print(f"\\nSafety Status: {'Clear' if len(detected_vehicles) < 3 else 'Caution - Multiple vehicles'}")
`,
      code: `import cv2
import numpy as np

def create_scene():
    img = np.ones((480, 640, 3), dtype=np.uint8) * 100
    cv2.rectangle(img, (0, 300), (640, 480), (80, 80, 80), -1)
    cv2.line(img, (100, 480), (200, 300), (255, 255, 0), 3)
    cv2.line(img, (540, 480), (440, 300), (255, 255, 0), 3)
    cv2.circle(img, (500, 150), 30, (0, 0, 255), -1)
    cv2.rectangle(img, (300, 350), (360, 400), (0, 0, 200), -1)
    return img

img = create_scene()
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 50, 150)

height, width = gray.shape
roi = np.array([[(0, height), (width//2, height*0.6), (width, height)]], dtype=np.int32)
mask = np.zeros_like(edges)
cv2.fillPoly(mask, roi, 255)
masked = cv2.bitwise_and(edges, mask)

lines = cv2.HoughLinesP(masked, 2, np.pi/180, 50, minLineLength=40, maxLineGap=100)

print(f"Detected {len(lines) if lines is not None else 0} lane lines")
print("Scene analysis complete")
`
    },

    {
      title: 'Real-Time Computer Vision Applications',
      description: `
## Real-Time Computer Vision Applications

### Overview
Deploying computer vision models in production requires optimization for real-time performance. This involves model compression, quantization, hardware acceleration, and efficient deployment on edge devices like mobile phones, Raspberry Pi, and NVIDIA Jetson.

### Key Concepts

**Performance Optimization**:
- Model quantization (FP32 → FP16 → INT8)
- Model pruning (removing redundant weights)
- Knowledge distillation (teacher-student)
- Neural Architecture Search (NAS)
- Efficient architectures (MobileNet, EfficientNet)

**Hardware Acceleration**:
- GPU acceleration with CUDA
- TensorRT for NVIDIA GPUs
- OpenVINO for Intel hardware
- Core ML for Apple devices
- TensorFlow Lite for mobile

**Deployment Platforms**:
- Mobile (iOS, Android)
- Edge devices (Raspberry Pi, Jetson Nano)
- Web browsers (TensorFlow.js, ONNX.js)
- Cloud inference (AWS, GCP, Azure)
- Embedded systems (microcontrollers)

**Optimization Techniques**:
- Batch processing
- Multi-threading and async processing
- Frame skipping for video
- Resolution reduction
- ROI-based processing

**Model Formats**:
- ONNX (Open Neural Network Exchange)
- TensorFlow Lite (.tflite)
- Core ML (.mlmodel)
- TensorRT engine
- PyTorch Mobile

**Real-Time Requirements**:
- Latency: <33ms for 30 FPS
- Throughput: Multiple streams
- Memory constraints
- Power efficiency
- Accuracy vs speed tradeoff

### Problem Statement
1. Optimize a model for real-time inference
2. Implement quantization (FP32 to INT8)
3. Measure inference time and FPS
4. Deploy on different hardware targets
5. Implement video processing pipeline
6. Balance accuracy and speed

### Expected Output
- Optimized model with reduced size
- Inference time comparisons
- FPS measurements
- Memory usage analysis
- Real-time video processing demo
`,
      starterCode: `import numpy as np
import time
import cv2
from collections import deque

# TODO: Create a simple CNN model for optimization
class SimpleCNN:
    def __init__(self, quantized=False):
        self.quantized = quantized
        # Simulate model weights
        self.weights = [np.random.randn(64, 3, 3, 3).astype(np.float32),
                       np.random.randn(128, 64, 3, 3).astype(np.float32)]
        if quantized:
            # Quantize to INT8
            self.weights = [self._quantize(w) for w in self.weights]
    
    def _quantize(self, weights):
        # TODO: Implement INT8 quantization
        scale = 
        quantized = np.clip(weights / scale, -128, 127).astype(np.int8)
        return quantized, scale
    
    def predict(self, x):
        # Simulate inference
        time.sleep(0.01 if not self.quantized else 0.005)
        return np.random.rand(10)

# TODO: Benchmark inference time
def benchmark_model(model, num_runs=100):
    times = []
    dummy_input = np.random.randn(1, 224, 224, 3).astype(np.float32)
    
    # Warmup
    for _ in range(10):
        model.predict(dummy_input)
    
    # Benchmark
    for _ in range(num_runs):
        start = 
        output = model.predict(dummy_input)
        end = 
        times.append()
    
    return times

# TODO: Compare FP32 vs INT8 models
fp32_model = SimpleCNN(quantized=False)
int8_model = SimpleCNN(quantized=True)

fp32_times = 
int8_times = 

# TODO: Calculate statistics
fp32_mean = 
int8_mean = 
speedup = 

# TODO: Real-time video processing simulation
class VideoProcessor:
    def __init__(self, model, target_fps=30):
        self.model = model
        self.target_fps = target_fps
        self.frame_time = 1.0 / target_fps
        self.fps_history = deque(maxlen=30)
    
    def process_frame(self, frame):
        start = time.time()
        
        # TODO: Preprocess frame
        resized = cv2.resize(frame, (, ))
        normalized = 
        
        # TODO: Run inference
        output = 
        
        # TODO: Calculate FPS
        elapsed = time.time() - start
        fps = 
        self.fps_history.append(fps)
        
        return output, fps
    
    def get_average_fps(self):
        return  if self.fps_history else 0

# TODO: Simulate video processing
processor = VideoProcessor(int8_model, target_fps=30)
frames = [np.random.randint(0, 255, (480, 640, 3), dtype=np.uint8) for _ in range(100)]

fps_values = []
for frame in frames:
    output, fps = processor.process_frame(frame)
    fps_values.append(fps)

# TODO: Print optimization results
print(f"FP32 Model: {fp32_mean*1000:.2f}ms")
print(f"INT8 Model: {int8_mean*1000:.2f}ms")
print(f"Speedup: {speedup:.2f}x")
print(f"Average FPS: {processor.get_average_fps():.1f}")
`,
      solution: `import numpy as np
import time
import cv2
from collections import deque
import matplotlib.pyplot as plt

# Simple CNN model for optimization
class SimpleCNN:
    def __init__(self, quantized=False):
        self.quantized = quantized
        # Simulate model weights
        self.weights = [np.random.randn(64, 3, 3, 3).astype(np.float32),
                       np.random.randn(128, 64, 3, 3).astype(np.float32)]
        self.scales = []
        
        if quantized:
            # Quantize to INT8
            quantized_weights = []
            for w in self.weights:
                q_w, scale = self._quantize(w)
                quantized_weights.append(q_w)
                self.scales.append(scale)
            self.weights = quantized_weights
    
    def _quantize(self, weights):
        """Quantize FP32 weights to INT8"""
        # Calculate scale factor
        max_val = np.abs(weights).max()
        scale = max_val / 127.0
        
        # Quantize
        quantized = np.clip(weights / scale, -128, 127).astype(np.int8)
        return quantized, scale
    
    def predict(self, x):
        """Simulate inference"""
        # Simulate different inference times
        time.sleep(0.01 if not self.quantized else 0.005)
        return np.random.rand(10)
    
    def get_model_size(self):
        """Calculate model size in MB"""
        total_params = sum(w.size for w in self.weights)
        bytes_per_param = 1 if self.quantized else 4  # INT8 vs FP32
        return (total_params * bytes_per_param) / (1024 * 1024)

# Benchmark inference time
def benchmark_model(model, num_runs=100):
    times = []
    dummy_input = np.random.randn(1, 224, 224, 3).astype(np.float32)
    
    # Warmup runs
    for _ in range(10):
        model.predict(dummy_input)
    
    # Benchmark runs
    for _ in range(num_runs):
        start = time.time()
        output = model.predict(dummy_input)
        end = time.time()
        times.append(end - start)
    
    return times

# Compare FP32 vs INT8 models
print("Creating and benchmarking models...")
fp32_model = SimpleCNN(quantized=False)
int8_model = SimpleCNN(quantized=True)

fp32_times = benchmark_model(fp32_model, num_runs=100)
int8_times = benchmark_model(int8_model, num_runs=100)

# Calculate statistics
fp32_mean = np.mean(fp32_times)
fp32_std = np.std(fp32_times)
int8_mean = np.mean(int8_times)
int8_std = np.std(int8_times)
speedup = fp32_mean / int8_mean

fp32_size = fp32_model.get_model_size()
int8_size = int8_model.get_model_size()
size_reduction = (fp32_size - int8_size) / fp32_size * 100

# Real-time video processing
class VideoProcessor:
    def __init__(self, model, target_fps=30):
        self.model = model
        self.target_fps = target_fps
        self.frame_time = 1.0 / target_fps
        self.fps_history = deque(maxlen=30)
        self.frame_count = 0
    
    def process_frame(self, frame):
        start = time.time()
        
        # Preprocess frame
        resized = cv2.resize(frame, (224, 224))
        normalized = resized.astype(np.float32) / 255.0
        
        # Run inference
        output = self.model.predict(normalized)
        
        # Calculate FPS
        elapsed = time.time() - start
        fps = 1.0 / elapsed if elapsed > 0 else 0
        self.fps_history.append(fps)
        self.frame_count += 1
        
        return output, fps
    
    def get_average_fps(self):
        return np.mean(self.fps_history) if self.fps_history else 0
    
    def meets_realtime_requirement(self):
        return self.get_average_fps() >= self.target_fps

# Simulate video processing
print("\\nSimulating real-time video processing...")
processor_fp32 = VideoProcessor(fp32_model, target_fps=30)
processor_int8 = VideoProcessor(int8_model, target_fps=30)

# Generate synthetic frames
num_frames = 100
frames = [np.random.randint(0, 255, (480, 640, 3), dtype=np.uint8) 
          for _ in range(num_frames)]

# Process with both models
fp32_fps_values = []
int8_fps_values = []

for frame in frames:
    _, fps_fp32 = processor_fp32.process_frame(frame)
    _, fps_int8 = processor_int8.process_frame(frame)
    fp32_fps_values.append(fps_fp32)
    int8_fps_values.append(fps_int8)

# Visualization
fig = plt.figure(figsize=(16, 10))

# Inference time comparison
ax1 = fig.add_subplot(2, 3, 1)
ax1.boxplot([np.array(fp32_times)*1000, np.array(int8_times)*1000], 
            labels=['FP32', 'INT8'])
ax1.set_ylabel('Inference Time (ms)')
ax1.set_title('Inference Time Distribution', fontweight='bold')
ax1.grid(axis='y', alpha=0.3)

# FPS comparison over time
ax2 = fig.add_subplot(2, 3, 2)
ax2.plot(fp32_fps_values, label='FP32', alpha=0.7, linewidth=2)
ax2.plot(int8_fps_values, label='INT8', alpha=0.7, linewidth=2)
ax2.axhline(y=30, color='r', linestyle='--', label='30 FPS Target')
ax2.set_xlabel('Frame Number')
ax2.set_ylabel('FPS')
ax2.set_title('Real-Time Performance', fontweight='bold')
ax2.legend()
ax2.grid(alpha=0.3)

# Model size comparison
ax3 = fig.add_subplot(2, 3, 3)
sizes = [fp32_size, int8_size]
colors = ['#FF6B6B', '#4ECDC4']
bars = ax3.bar(['FP32', 'INT8'], sizes, color=colors)
ax3.set_ylabel('Model Size (MB)')
ax3.set_title(f'Model Size (Reduction: {size_reduction:.1f}%)', fontweight='bold')
ax3.grid(axis='y', alpha=0.3)
for bar in bars:
    height = bar.get_height()
    ax3.text(bar.get_x() + bar.get_width()/2., height,
            f'{height:.2f} MB', ha='center', va='bottom')

# Average FPS comparison
ax4 = fig.add_subplot(2, 3, 4)
avg_fps = [processor_fp32.get_average_fps(), processor_int8.get_average_fps()]
bars = ax4.bar(['FP32', 'INT8'], avg_fps, color=colors)
ax4.axhline(y=30, color='r', linestyle='--', label='30 FPS Target')
ax4.set_ylabel('Average FPS')
ax4.set_title('Average FPS Comparison', fontweight='bold')
ax4.legend()
ax4.grid(axis='y', alpha=0.3)
for bar in bars:
    height = bar.get_height()
    ax4.text(bar.get_x() + bar.get_width()/2., height,
            f'{height:.1f}', ha='center', va='bottom')

# Speedup metrics
ax5 = fig.add_subplot(2, 3, 5)
metrics = ['Inference\\nSpeedup', 'FPS\\nImprovement', 'Size\\nReduction']
values = [speedup, 
          processor_int8.get_average_fps() / processor_fp32.get_average_fps(),
          size_reduction / 100]
bars = ax5.bar(metrics, values, color=['#45B7D1', '#FFA07A', '#98D8C8'])
ax5.set_ylabel('Improvement Factor')
ax5.set_title('Optimization Metrics', fontweight='bold')
ax5.grid(axis='y', alpha=0.3)
for bar in bars:
    height = bar.get_height()
    ax5.text(bar.get_x() + bar.get_width()/2., height,
            f'{height:.2f}x', ha='center', va='bottom')

# Performance summary table
ax6 = fig.add_subplot(2, 3, 6)
ax6.axis('off')
table_data = [
    ['Metric', 'FP32', 'INT8', 'Improvement'],
    ['Inference Time', f'{fp32_mean*1000:.2f}ms', f'{int8_mean*1000:.2f}ms', f'{speedup:.2f}x'],
    ['Average FPS', f'{processor_fp32.get_average_fps():.1f}', 
     f'{processor_int8.get_average_fps():.1f}', 
     f'{processor_int8.get_average_fps()/processor_fp32.get_average_fps():.2f}x'],
    ['Model Size', f'{fp32_size:.2f}MB', f'{int8_size:.2f}MB', f'{size_reduction:.1f}%'],
    ['Real-time (30fps)', 
     '✗' if processor_fp32.get_average_fps() < 30 else '✓',
     '✓' if processor_int8.get_average_fps() >= 30 else '✗', '-']
]
table = ax6.table(cellText=table_data, cellLoc='center', loc='center',
                 colWidths=[0.3, 0.2, 0.2, 0.3])
table.auto_set_font_size(False)
table.set_fontsize(9)
table.scale(1, 2)
for i in range(len(table_data[0])):
    table[(0, i)].set_facecolor('#E8E8E8')
    table[(0, i)].set_text_props(weight='bold')

plt.suptitle('Real-Time Computer Vision Optimization Results', 
            fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\nOptimization Results:")
print("="*70)
print(f"FP32 Model:")
print(f"  Inference Time: {fp32_mean*1000:.2f} ± {fp32_std*1000:.2f} ms")
print(f"  Average FPS: {processor_fp32.get_average_fps():.1f}")
print(f"  Model Size: {fp32_size:.2f} MB")
print(f"  Real-time capable: {'Yes' if processor_fp32.meets_realtime_requirement() else 'No'}")
print(f"\\nINT8 Model:")
print(f"  Inference Time: {int8_mean*1000:.2f} ± {int8_std*1000:.2f} ms")
print(f"  Average FPS: {processor_int8.get_average_fps():.1f}")
print(f"  Model Size: {int8_size:.2f} MB")
print(f"  Real-time capable: {'Yes' if processor_int8.meets_realtime_requirement() else 'No'}")
print(f"\\nImprovements:")
print(f"  Speedup: {speedup:.2f}x faster")
print(f"  FPS Improvement: {processor_int8.get_average_fps()/processor_fp32.get_average_fps():.2f}x")
print(f"  Size Reduction: {size_reduction:.1f}%")
print(f"\\nDeployment Recommendation:")
if processor_int8.meets_realtime_requirement():
    print(f"  ✓ INT8 model suitable for real-time deployment (30+ FPS)")
else:
    print(f"  ⚠ Further optimization needed for real-time requirements")
`,
      code: `import numpy as np
import time

class SimpleCNN:
    def __init__(self, quantized=False):
        self.quantized = quantized
        self.weights = [np.random.randn(64, 3, 3, 3).astype(np.float32)]
    
    def predict(self, x):
        time.sleep(0.01 if not self.quantized else 0.005)
        return np.random.rand(10)

def benchmark(model, runs=50):
    times = []
    for _ in range(runs):
        start = time.time()
        model.predict(np.random.randn(1, 224, 224, 3))
        times.append(time.time() - start)
    return np.mean(times)

fp32_model = SimpleCNN(quantized=False)
int8_model = SimpleCNN(quantized=True)

fp32_time = benchmark(fp32_model)
int8_time = benchmark(int8_model)
speedup = fp32_time / int8_time

print(f"FP32: {fp32_time*1000:.2f}ms")
print(f"INT8: {int8_time*1000:.2f}ms")
print(f"Speedup: {speedup:.2f}x")
print(f"FPS: {1/int8_time:.1f}")
`
    },

    {
      title: 'Advanced Topics: NeRF, SAM, Vision Transformers',
      description: `
## Advanced Topics in Computer Vision (2024)

### Overview
This lesson covers cutting-edge computer vision techniques from 2023-2024 research, including Neural Radiance Fields (NeRF) for 3D reconstruction, Segment Anything Model (SAM) for universal segmentation, Vision Transformers (ViT), and foundation models like CLIP and diffusion models.

### Key Concepts

**Neural Radiance Fields (NeRF)**:
- 3D scene reconstruction from 2D images
- Volumetric rendering with neural networks
- Novel view synthesis
- Implicit 3D representations
- Applications: VR/AR, 3D modeling, photogrammetry

**Segment Anything Model (SAM)**:
- Zero-shot segmentation
- Promptable segmentation (points, boxes, text)
- Universal image segmentation
- Foundation model for segmentation
- 1 billion mask dataset training

**Vision Transformers (ViT)**:
- Self-attention for images
- Patch-based image processing
- Scalability to large datasets
- Transfer learning capabilities
- Outperforms CNNs on large-scale data

**CLIP (Contrastive Language-Image Pre-training)**:
- Vision-language understanding
- Zero-shot image classification
- Text-to-image retrieval
- Multi-modal embeddings
- 400M image-text pairs training

**Diffusion Models**:
- Stable Diffusion for image generation
- Denoising diffusion probabilistic models
- Text-to-image synthesis
- Image editing and inpainting
- State-of-the-art image quality

**Foundation Models**:
- Large-scale pre-training
- Transfer to downstream tasks
- Few-shot and zero-shot learning
- Multi-modal capabilities
- Emergent abilities at scale

### Problem Statement
1. Understand NeRF architecture and 3D reconstruction
2. Implement SAM-style promptable segmentation
3. Build Vision Transformer for classification
4. Use CLIP for zero-shot classification
5. Explore diffusion models for generation
6. Compare foundation models vs traditional approaches

### Expected Output
- 3D scene reconstruction visualization
- Interactive segmentation with prompts
- ViT classification results
- CLIP zero-shot predictions
- Generated images from text prompts
- Performance comparisons
`,
      starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

# TODO: Simplified NeRF - 3D point cloud representation
class SimpleNeRF:
    def __init__(self, num_points=1000):
        self.num_points = num_points
        # TODO: Initialize 3D points and colors
        self.points = 
        self.colors = 
    
    def render_view(self, camera_angle):
        # TODO: Rotate points based on camera angle
        rotation_matrix = self._get_rotation_matrix(camera_angle)
        rotated_points = 
        
        # TODO: Project to 2D
        projected = rotated_points[:, :2]
        return projected, self.colors
    
    def _get_rotation_matrix(self, angle):
        # TODO: Create rotation matrix around Y axis
        cos_a, sin_a = np.cos(angle), np.sin(angle)
        return np.array([
            [, 0, ],
            [0, 1, 0],
            [, 0, ]
        ])

# TODO: Vision Transformer - Patch embedding
class SimpleViT:
    def __init__(self, image_size=224, patch_size=16, num_classes=10):
        self.image_size = image_size
        self.patch_size = patch_size
        self.num_patches = (image_size // patch_size) ** 2
        self.num_classes = num_classes
        
        # TODO: Initialize patch embedding weights
        self.patch_embed = np.random.randn(patch_size*patch_size*3, 128)
        self.cls_token = np.random.randn(1, 128)
        self.pos_embed = np.random.randn(self.num_patches + 1, 128)
    
    def extract_patches(self, image):
        # TODO: Split image into patches
        patches = []
        for i in range(0, self.image_size, self.patch_size):
            for j in range(0, self.image_size, self.patch_size):
                patch = image[i:i+self.patch_size, j:j+self.patch_size]
                patches.append(patch.flatten())
        return np.array(patches)
    
    def forward(self, image):
        # TODO: Extract and embed patches
        patches = 
        patch_embeddings = 
        
        # TODO: Add CLS token and positional embeddings
        embeddings = np.vstack([self.cls_token, patch_embeddings])
        embeddings = 
        
        return embeddings

# TODO: CLIP-style zero-shot classification
class SimpleCLIP:
    def __init__(self, embedding_dim=512):
        self.embedding_dim = embedding_dim
        # TODO: Initialize image and text encoders
        self.image_encoder = np.random.randn(2048, embedding_dim)
        self.text_encoder = np.random.randn(300, embedding_dim)
    
    def encode_image(self, image_features):
        # TODO: Project image features to embedding space
        return 
    
    def encode_text(self, text_features):
        # TODO: Project text features to embedding space
        return 
    
    def compute_similarity(self, image_emb, text_emb):
        # TODO: Compute cosine similarity
        return 

# TODO: Segment Anything Model (SAM) - Simplified
class SimpleSAM:
    def __init__(self):
        self.image_encoder = None
        self.prompt_encoder = None
    
    def segment_with_point(self, image, point):
        # TODO: Segment based on point prompt
        # Use distance-based segmentation
        h, w = image.shape[:2]
        y, x = np.ogrid[:h, :w]
        distance = 
        mask = distance < 
        return mask
    
    def segment_with_box(self, image, box):
        # TODO: Segment based on box prompt
        x1, y1, x2, y2 = box
        mask = np.zeros(image.shape[:2], dtype=bool)
        mask[y1:y2, x1:x2] = 
        return mask

# TODO: Test NeRF
nerf = SimpleNeRF(num_points=500)
views = []
for angle in np.linspace(0, 2*np.pi, 8):
    projected, colors = nerf.render_view(angle)
    views.append((projected, colors))

# TODO: Test ViT
vit = SimpleViT(image_size=224, patch_size=16)
test_image = np.random.rand(224, 224, 3)
embeddings = vit.forward(test_image)

# TODO: Test CLIP
clip = SimpleCLIP(embedding_dim=512)
image_features = np.random.randn(2048)
text_features = np.random.randn(300)
similarity = 

# TODO: Test SAM
sam = SimpleSAM()
test_img = np.random.rand(256, 256, 3)
point_mask = sam.segment_with_point(test_img, (128, 128))
box_mask = sam.segment_with_box(test_img, (50, 50, 200, 200))

print(f"NeRF: Generated {len(views)} views")
print(f"ViT: Embeddings shape {embeddings.shape}")
print(f"CLIP: Similarity score {similarity:.3f}")
print(f"SAM: Point mask {point_mask.sum()} pixels, Box mask {box_mask.sum()} pixels")
`,
      solution: `import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from sklearn.decomposition import PCA

# Simplified NeRF - 3D point cloud representation
class SimpleNeRF:
    def __init__(self, num_points=1000):
        self.num_points = num_points
        # Initialize 3D points (sphere)
        phi = np.random.uniform(0, 2*np.pi, num_points)
        theta = np.random.uniform(0, np.pi, num_points)
        r = np.random.uniform(0.8, 1.0, num_points)
        
        self.points = np.column_stack([
            r * np.sin(theta) * np.cos(phi),
            r * np.sin(theta) * np.sin(phi),
            r * np.cos(theta)
        ])
        
        # Assign colors based on position
        self.colors = (self.points + 1) / 2  # Normalize to [0, 1]
    
    def render_view(self, camera_angle):
        """Render view from specific camera angle"""
        rotation_matrix = self._get_rotation_matrix(camera_angle)
        rotated_points = self.points @ rotation_matrix.T
        
        # Project to 2D (orthographic projection)
        projected = rotated_points[:, :2]
        
        # Sort by depth for proper rendering
        depth_order = np.argsort(rotated_points[:, 2])
        
        return projected[depth_order], self.colors[depth_order]
    
    def _get_rotation_matrix(self, angle):
        """Create rotation matrix around Y axis"""
        cos_a, sin_a = np.cos(angle), np.sin(angle)
        return np.array([
            [cos_a, 0, sin_a],
            [0, 1, 0],
            [-sin_a, 0, cos_a]
        ])

# Vision Transformer - Patch embedding
class SimpleViT:
    def __init__(self, image_size=224, patch_size=16, num_classes=10):
        self.image_size = image_size
        self.patch_size = patch_size
        self.num_patches = (image_size // patch_size) ** 2
        self.num_classes = num_classes
        self.embed_dim = 128
        
        # Initialize weights
        patch_dim = patch_size * patch_size * 3
        self.patch_embed = np.random.randn(patch_dim, self.embed_dim) * 0.02
        self.cls_token = np.random.randn(1, self.embed_dim) * 0.02
        self.pos_embed = np.random.randn(self.num_patches + 1, self.embed_dim) * 0.02
        self.classifier = np.random.randn(self.embed_dim, num_classes) * 0.02
    
    def extract_patches(self, image):
        """Split image into patches"""
        patches = []
        for i in range(0, self.image_size, self.patch_size):
            for j in range(0, self.image_size, self.patch_size):
                patch = image[i:i+self.patch_size, j:j+self.patch_size]
                patches.append(patch.flatten())
        return np.array(patches)
    
    def forward(self, image):
        """Forward pass through ViT"""
        # Extract and embed patches
        patches = self.extract_patches(image)
        patch_embeddings = patches @ self.patch_embed
        
        # Add CLS token and positional embeddings
        embeddings = np.vstack([self.cls_token, patch_embeddings])
        embeddings = embeddings + self.pos_embed
        
        # Simple attention (just use CLS token for classification)
        cls_embedding = embeddings[0]
        logits = cls_embedding @ self.classifier
        
        return embeddings, logits

# CLIP-style zero-shot classification
class SimpleCLIP:
    def __init__(self, embedding_dim=512):
        self.embedding_dim = embedding_dim
        # Initialize encoders
        self.image_encoder = np.random.randn(2048, embedding_dim) * 0.02
        self.text_encoder = np.random.randn(300, embedding_dim) * 0.02
        self.temperature = 0.07
    
    def encode_image(self, image_features):
        """Project image features to embedding space"""
        embedding = image_features @ self.image_encoder
        # L2 normalize
        return embedding / (np.linalg.norm(embedding) + 1e-8)
    
    def encode_text(self, text_features):
        """Project text features to embedding space"""
        embedding = text_features @ self.text_encoder
        # L2 normalize
        return embedding / (np.linalg.norm(embedding) + 1e-8)
    
    def compute_similarity(self, image_emb, text_emb):
        """Compute cosine similarity"""
        return np.dot(image_emb, text_emb) / self.temperature
    
    def zero_shot_classify(self, image_features, text_features_list):
        """Classify image using text prompts"""
        image_emb = self.encode_image(image_features)
        
        similarities = []
        for text_features in text_features_list:
            text_emb = self.encode_text(text_features)
            sim = self.compute_similarity(image_emb, text_emb)
            similarities.append(sim)
        
        # Softmax
        similarities = np.array(similarities)
        exp_sim = np.exp(similarities)
        probs = exp_sim / exp_sim.sum()
        
        return probs

# Segment Anything Model (SAM) - Simplified
class SimpleSAM:
    def __init__(self):
        self.threshold = 50
    
    def segment_with_point(self, image, point, radius=50):
        """Segment based on point prompt"""
        h, w = image.shape[:2]
        y, x = np.ogrid[:h, :w]
        
        # Distance from point
        py, px = point
        distance = np.sqrt((x - px)**2 + (y - py)**2)
        
        # Create mask based on distance
        mask = distance < radius
        
        # Refine with color similarity
        if image.ndim == 3:
            center_color = image[py, px]
            color_diff = np.linalg.norm(image - center_color, axis=2)
            color_mask = color_diff < 50
            mask = mask & color_mask
        
        return mask.astype(np.uint8)
    
    def segment_with_box(self, image, box):
        """Segment based on box prompt"""
        x1, y1, x2, y2 = box
        h, w = image.shape[:2]
        
        mask = np.zeros((h, w), dtype=np.uint8)
        mask[y1:y2, x1:x2] = 1
        
        # Refine with color similarity inside box
        if image.ndim == 3:
            roi = image[y1:y2, x1:x2]
            mean_color = roi.mean(axis=(0, 1))
            color_diff = np.linalg.norm(image - mean_color, axis=2)
            color_mask = color_diff < 40
            mask = mask & color_mask
        
        return mask

# Create synthetic test data
def create_test_image():
    """Create a test image with objects"""
    img = np.ones((256, 256, 3)) * 0.8
    
    # Add colored circles
    y, x = np.ogrid[:256, :256]
    
    # Red circle
    circle1 = (x - 80)**2 + (y - 80)**2 < 30**2
    img[circle1] = [0.9, 0.2, 0.2]
    
    # Blue circle
    circle2 = (x - 180)**2 + (y - 180)**2 < 25**2
    img[circle2] = [0.2, 0.2, 0.9]
    
    # Green square
    img[120:160, 120:160] = [0.2, 0.9, 0.2]
    
    return img

# Test all models
print("Testing Advanced Computer Vision Models...")
print("="*70)

# 1. NeRF - 3D Reconstruction
print("\\n1. Neural Radiance Fields (NeRF)")
nerf = SimpleNeRF(num_points=500)
views = []
angles = np.linspace(0, 2*np.pi, 8)
for angle in angles:
    projected, colors = nerf.render_view(angle)
    views.append((projected, colors))
print(f"   Generated {len(views)} novel views from 3D representation")
print(f"   Point cloud size: {nerf.num_points} points")

# 2. Vision Transformer
print("\\n2. Vision Transformer (ViT)")
vit = SimpleViT(image_size=224, patch_size=16, num_classes=10)
test_image = np.random.rand(224, 224, 3)
embeddings, logits = vit.forward(test_image)
predicted_class = np.argmax(logits)
print(f"   Image size: 224x224, Patch size: 16x16")
print(f"   Number of patches: {vit.num_patches}")
print(f"   Embeddings shape: {embeddings.shape}")
print(f"   Predicted class: {predicted_class}")

# 3. CLIP Zero-shot Classification
print("\\n3. CLIP (Contrastive Language-Image Pre-training)")
clip = SimpleCLIP(embedding_dim=512)
image_features = np.random.randn(2048)
text_prompts = [
    np.random.randn(300),  # "a photo of a cat"
    np.random.randn(300),  # "a photo of a dog"
    np.random.randn(300),  # "a photo of a bird"
]
class_names = ["cat", "dog", "bird"]
probs = clip.zero_shot_classify(image_features, text_prompts)
predicted_idx = np.argmax(probs)
print(f"   Zero-shot classification results:")
for name, prob in zip(class_names, probs):
    print(f"     {name}: {prob*100:.1f}%")
print(f"   Predicted: {class_names[predicted_idx]}")

# 4. Segment Anything Model (SAM)
print("\\n4. Segment Anything Model (SAM)")
sam = SimpleSAM()
test_img = create_test_image()

# Point prompt
point_mask = sam.segment_with_point(test_img, (80, 80), radius=40)
print(f"   Point-based segmentation: {point_mask.sum()} pixels")

# Box prompt
box_mask = sam.segment_with_box(test_img, (60, 60, 100, 100))
print(f"   Box-based segmentation: {box_mask.sum()} pixels")

# Visualization
fig = plt.figure(figsize=(16, 12))

# NeRF views
for i, (projected, colors) in enumerate(views[:6]):
    ax = fig.add_subplot(3, 4, i+1)
    ax.scatter(projected[:, 0], projected[:, 1], c=colors, s=20, alpha=0.6)
    ax.set_xlim(-1.5, 1.5)
    ax.set_ylim(-1.5, 1.5)
    ax.set_aspect('equal')
    ax.set_title(f'NeRF View {i+1}', fontweight='bold')
    ax.axis('off')

# ViT patches visualization
ax7 = fig.add_subplot(3, 4, 7)
patch_grid = np.zeros((224, 224, 3))
for i in range(0, 224, 16):
    patch_grid[i:i+2, :] = 1
    patch_grid[:, i:i+2] = 1
ax7.imshow(test_image)
ax7.imshow(patch_grid, alpha=0.3)
ax7.set_title('ViT Patches (16x16)', fontweight='bold')
ax7.axis('off')

# ViT embeddings (PCA visualization)
ax8 = fig.add_subplot(3, 4, 8)
if embeddings.shape[0] > 2:
    pca = PCA(n_components=2)
    emb_2d = pca.fit_transform(embeddings)
    ax8.scatter(emb_2d[1:, 0], emb_2d[1:, 1], c='blue', s=50, alpha=0.6, label='Patches')
    ax8.scatter(emb_2d[0, 0], emb_2d[0, 1], c='red', s=100, marker='*', label='CLS Token')
    ax8.legend()
ax8.set_title('ViT Embeddings (PCA)', fontweight='bold')
ax8.grid(alpha=0.3)

# CLIP classification
ax9 = fig.add_subplot(3, 4, 9)
bars = ax9.bar(class_names, probs * 100, color=['#FF6B6B', '#4ECDC4', '#45B7D1'])
ax9.set_ylabel('Probability (%)')
ax9.set_title('CLIP Zero-Shot Classification', fontweight='bold')
ax9.grid(axis='y', alpha=0.3)
for bar in bars:
    height = bar.get_height()
    ax9.text(bar.get_x() + bar.get_width()/2., height,
            f'{height:.1f}%', ha='center', va='bottom')

# SAM - Original image
ax10 = fig.add_subplot(3, 4, 10)
ax10.imshow(test_img)
ax10.plot(80, 80, 'r*', markersize=15, label='Point Prompt')
rect = plt.Rectangle((60, 60), 40, 40, fill=False, edgecolor='blue', linewidth=2, label='Box Prompt')
ax10.add_patch(rect)
ax10.set_title('SAM Input with Prompts', fontweight='bold')
ax10.legend()
ax10.axis('off')

# SAM - Point segmentation
ax11 = fig.add_subplot(3, 4, 11)
ax11.imshow(test_img)
ax11.imshow(point_mask, alpha=0.5, cmap='Reds')
ax11.set_title(f'SAM Point Segmentation', fontweight='bold')
ax11.axis('off')

# SAM - Box segmentation
ax12 = fig.add_subplot(3, 4, 12)
ax12.imshow(test_img)
ax12.imshow(box_mask, alpha=0.5, cmap='Blues')
ax12.set_title(f'SAM Box Segmentation', fontweight='bold')
ax12.axis('off')

plt.suptitle('Advanced Computer Vision: NeRF, ViT, CLIP, SAM', 
            fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\n" + "="*70)
print("Summary of Advanced Techniques:")
print("="*70)
print("\\n1. NeRF (Neural Radiance Fields):")
print("   - 3D scene representation from 2D images")
print("   - Novel view synthesis")
print("   - Applications: VR/AR, 3D modeling")
print("\\n2. Vision Transformer (ViT):")
print("   - Attention-based architecture for images")
print("   - Patch-based processing")
print("   - Scalable to large datasets")
print("\\n3. CLIP (Vision-Language Model):")
print("   - Zero-shot classification")
print("   - Multi-modal understanding")
print("   - Text-image alignment")
print("\\n4. SAM (Segment Anything):")
print("   - Universal segmentation")
print("   - Promptable with points/boxes")
print("   - Zero-shot generalization")
print("\\nThese foundation models represent the cutting edge of")
print("computer vision research in 2024, enabling new applications")
print("and capabilities previously impossible with traditional methods.")
`,
      code: `import numpy as np

class SimpleNeRF:
    def __init__(self, n=500):
        phi = np.random.uniform(0, 2*np.pi, n)
        theta = np.random.uniform(0, np.pi, n)
        self.points = np.column_stack([
            np.sin(theta) * np.cos(phi),
            np.sin(theta) * np.sin(phi),
            np.cos(theta)
        ])
    
    def render(self, angle):
        c, s = np.cos(angle), np.sin(angle)
        R = np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]])
        return (self.points @ R.T)[:, :2]

class SimpleViT:
    def __init__(self):
        self.patch_size = 16
        self.embed = np.random.randn(768, 128)
    
    def forward(self, img):
        patches = []
        for i in range(0, 224, 16):
            for j in range(0, 224, 16):
                patches.append(img[i:i+16, j:j+16].flatten())
        return np.array(patches) @ self.embed

class SimpleCLIP:
    def __init__(self):
        self.img_enc = np.random.randn(2048, 512)
        self.txt_enc = np.random.randn(300, 512)
    
    def similarity(self, img_feat, txt_feat):
        img_emb = img_feat @ self.img_enc
        txt_emb = txt_feat @ self.txt_enc
        return np.dot(img_emb, txt_emb) / (np.linalg.norm(img_emb) * np.linalg.norm(txt_emb))

# Test
nerf = SimpleNeRF(n=500)
view = nerf.render(np.pi/4)
print(f"NeRF: {view.shape[0]} points rendered")

vit = SimpleViT()
img = np.random.rand(224, 224, 3)
emb = vit.forward(img)
print(f"ViT: {emb.shape[0]} patch embeddings")

clip = SimpleCLIP()
sim = clip.similarity(np.random.randn(2048), np.random.randn(300))
print(f"CLIP: similarity = {sim:.3f}")
`
    }
  ]
};
