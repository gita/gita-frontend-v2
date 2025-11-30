import os
from PIL import Image

def crop_and_resize(image_path, output_dir, output_prefix, targets, focal_point=(0.5, 0.5)):
    """
    Crops and resizes an image to multiple targets centered around a focal point.
    
    Args:
        image_path (str): Path to source image.
        output_dir (str): Directory to save output images.
        output_prefix (str): Prefix for output filenames.
        targets (list): List of tuples (width, height, suffix).
        focal_point (tuple): (x, y) relative coordinates of the focal point (0.0 to 1.0).
    """
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    try:
        img = Image.open(image_path)
        img = img.convert('RGB') # Ensure RGB for WebP
    except Exception as e:
        print(f"Error opening image {image_path}: {e}")
        return

    original_width, original_height = img.size
    print(f"Original size: {original_width}x{original_height}")

    for target_width, target_height, aspect_name in targets:
        target_ratio = target_width / target_height
        original_ratio = original_width / original_height
        
        # Calculate crop dimensions
        if original_ratio > target_ratio:
            # Image is wider than target: Crop width
            crop_height = original_height
            crop_width = int(original_height * target_ratio)
        else:
            # Image is taller than target: Crop height
            crop_width = original_width
            crop_height = int(original_width / target_ratio)
            
        # Calculate crop coordinates based on focal point
        center_x = int(original_width * focal_point[0])
        center_y = int(original_height * focal_point[1])
        
        left = center_x - crop_width // 2
        top = center_y - crop_height // 2
        
        # Adjust if out of bounds
        if left < 0:
            left = 0
        elif left + crop_width > original_width:
            left = original_width - crop_width
            
        if top < 0:
            top = 0
        elif top + crop_height > original_height:
            top = original_height - crop_height
            
        right = left + crop_width
        bottom = top + crop_height
        
        crop_box = (left, top, right, bottom)
        
        # Crop and resize
        cropped_img = img.crop(crop_box)
        resized_img = cropped_img.resize((target_width, target_height), Image.Resampling.LANCZOS)
        
        # Save
        output_filename = f"{output_prefix}-{aspect_name}-{target_width}x{target_height}.webp"
        output_path = os.path.join(output_dir, output_filename)
        resized_img.save(output_path, 'WEBP', quality=90)
        print(f"Saved {output_path}")

if __name__ == "__main__":
    # Configuration
    SOURCE_IMAGE = "public/bhagavadgita.png"
    OUTPUT_DIR = "public/images/hero"
    OUTPUT_PREFIX = "bhagavad-gita"
    
    # (width, height, aspect_ratio_name)
    # Based on existing files in public/images/hero/
    TARGETS = [
        (1152, 495, "21x9"),
        (2304, 990, "21x9"),
        (1152, 648, "16x9"),
        (2304, 1296, "16x9"),
        (1024, 768, "4x3"),
        (2048, 1536, "4x3"),
        (576, 768, "3x4"),
        (1152, 1536, "3x4"),
    ]
    
    # Focal point (x, y) - 0.5, 0.5 is center.
    # Adjust this to focus on Krishna and Arjuna.
    # Assuming they are central for now.
    FOCAL_POINT = (0.5, 0.5) 
    
    crop_and_resize(SOURCE_IMAGE, OUTPUT_DIR, OUTPUT_PREFIX, TARGETS, FOCAL_POINT)

