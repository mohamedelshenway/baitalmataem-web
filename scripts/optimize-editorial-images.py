"""Create consistent responsive WebP/AVIF derivatives for editorial photos."""

from pathlib import Path

from PIL import Image, ImageEnhance


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "images" / "editorial" / "source"
OUTPUT = ROOT / "public" / "images" / "editorial"

# source filename, output stem, optional crop (left, top, right, bottom)
PHOTOS = [
    ("restaurant-interior.jpg", "restaurant-interior", None),
    ("commercial-kitchen.jpg", "commercial-kitchen", (165, 150, 1125, 750)),
    ("operations-team-alt.jpg", "operations-team", (0, 1400, 1600, 2400)),
    ("management-meeting.jpg", "management-meeting", None),
    ("restaurant-equipment.jpg", "restaurant-equipment", None),
    ("feasibility-analysis.jpg", "feasibility-analysis", None),
    ("catering-service.jpg", "catering-service", (0, 430, 1800, 1555)),
    ("restaurant-marketing-alt.jpg", "restaurant-marketing", (0, 720, 1800, 1845)),
]

SIZES = {"lg": (1600, 1000), "md": (960, 600)}


def crop_to_ratio(image: Image.Image, ratio: float = 1.6) -> Image.Image:
    width, height = image.size
    current = width / height
    if current > ratio:
        target_width = round(height * ratio)
        left = (width - target_width) // 2
        return image.crop((left, 0, left + target_width, height))
    target_height = round(width / ratio)
    top = (height - target_height) // 2
    return image.crop((0, top, width, top + target_height))


def grade(image: Image.Image) -> Image.Image:
    image = ImageEnhance.Color(image).enhance(0.9)
    image = ImageEnhance.Contrast(image).enhance(1.06)
    return ImageEnhance.Brightness(image).enhance(0.98)


OUTPUT.mkdir(parents=True, exist_ok=True)
for source_name, stem, crop in PHOTOS:
    image = Image.open(SOURCE / source_name).convert("RGB")
    if crop:
        image = image.crop(crop)
    image = grade(crop_to_ratio(image))
    for size_name, dimensions in SIZES.items():
        resized = image.resize(dimensions, Image.Resampling.LANCZOS)
        resized.save(OUTPUT / f"{stem}-{size_name}.webp", "WEBP", quality=82, method=6)
        resized.save(OUTPUT / f"{stem}-{size_name}.avif", "AVIF", quality=55, speed=6)
