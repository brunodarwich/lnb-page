import os
from PIL import Image

def make_transparent():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    image_path = os.path.join(script_dir, '../assets/images/app-mockup.jpeg')
    output_path = os.path.join(script_dir, '../assets/images/app-mockup.png')
    
    if not os.path.exists(image_path):
        print(f"Error: {image_path} not found!")
        return

    # Load image and convert to RGBA
    img = Image.open(image_path)
    img = img.convert('RGBA')
    width, height = img.size
    
    # Get the background color at (0, 0)
    bg_color = img.getpixel((0, 0))
    print(f"Detected background color: {bg_color}")
    
    # We will use a flood fill from the 4 corners to only select the exterior background
    # This prevents making any internal off-white elements of the phone screen transparent
    visited = set()
    queue = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    for p in queue:
        visited.add(p)
        
    background_mask = Image.new('1', (width, height), 0)
    mask_pixels = background_mask.load()
    
    # Color distance threshold (generous to clean up anti-aliasing edges)
    tolerance = 45
    
    def color_dist(c1, c2):
        return ((c1[0]-c2[0])**2 + (c1[1]-c2[1])**2 + (c1[2]-c2[2])**2)**0.5

    print("Running flood-fill to isolate background...")
    while queue:
        x, y = queue.pop(0)
        mask_pixels[x, y] = 1
        
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    nc = img.getpixel((nx, ny))
                    if color_dist(nc, bg_color) <= tolerance:
                        visited.add((nx, ny))
                        queue.append((nx, ny))
                        
    # Convert masked pixels to transparent alpha
    pixels = img.load()
    for y in range(height):
        for x in range(width):
            if mask_pixels[x, y] == 1:
                pixels[x, y] = (0, 0, 0, 0)
                
    # Save the output image
    img.save(output_path, 'PNG')
    print(f"Successfully saved transparent image to {output_path}!")

if __name__ == '__main__':
    make_transparent()
