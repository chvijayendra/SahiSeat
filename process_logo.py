from PIL import Image

# Read image
img = Image.open('logo.png').convert('RGBA')
width, height = img.size
pixels = img.load()

# Background color is dark grey/blue, around rgb(40,48,56)
bg_color = pixels[0, 0][:3]

# Create mask and find bounds
min_x, min_y, max_x, max_y = width, height, 0, 0

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # Calculate distance
        dist = abs(r - bg_color[0]) + abs(g - bg_color[1]) + abs(b - bg_color[2])
        if dist > 30:
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)
            # Threshold glow
            pixels[x, y] = (r, g, b, 255 if dist > 60 else 0)
        else:
            pixels[x, y] = (0, 0, 0, 0)

# Crop to non-transparent bounds
cropped = img.crop((min_x, min_y, max_x, max_y))
c_width, c_height = cropped.size
c_pixels = cropped.load()

# Find split between icon and text
row_sums = []
for y in range(c_height):
    row_sum = sum(1 for x in range(c_width) if c_pixels[x, y][3] > 0)
    row_sums.append(row_sum)

mid_start = int(c_height * 0.4)
mid_end = int(c_height * 0.8)
min_row_val = min(row_sums[mid_start:mid_end])
split_y = mid_start + row_sums[mid_start:mid_end].index(min_row_val)

# Crop to icon
icon = cropped.crop((0, 0, c_width, split_y))

# Remove empty horizontal space again
i_width, i_height = icon.size
i_pixels = icon.load()
i_min_x, i_min_y, i_max_x, i_max_y = i_width, i_height, 0, 0

for y in range(i_height):
    for x in range(i_width):
        if i_pixels[x, y][3] > 0:
            i_min_x = min(i_min_x, x)
            i_min_y = min(i_min_y, y)
            i_max_x = max(i_max_x, x)
            i_max_y = max(i_max_y, y)

final_icon = icon.crop((i_min_x, i_min_y, i_max_x, i_max_y))

# Resize to ~80px width
target_w = 80
target_h = int((i_max_y - i_min_y) * (target_w / (i_max_x - i_min_x)))
resized_icon = final_icon.resize((target_w, target_h), Image.Resampling.LANCZOS)

# Save
resized_icon.save('small_icon.png')
print("Saved small_icon.png")
