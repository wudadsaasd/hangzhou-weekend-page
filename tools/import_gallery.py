from pathlib import Path

from PIL import Image


def main() -> None:
    src_dir = Path(r"C:\Users\wind\.codex\generated_images\019dba8e-7e0e-7cd1-97df-20499c810829")
    out_dir = Path(r"F:\GitHub\GitHub（obsdidan）\hangzhou-weekend-page\assets\gallery")
    out_dir.mkdir(parents=True, exist_ok=True)

    files = sorted(src_dir.glob("*.png"), key=lambda p: p.stat().st_mtime)[1:]
    if len(files) != 24:
      raise RuntimeError(f"expected 24 generated images, got {len(files)}")

    names = [
        "day1-morning-01-broken-bridge-anime.webp",
        "day1-morning-02-bai-causeway-film.webp",
        "day1-morning-03-west-lake-paper-diorama.webp",
        "day1-morning-04-west-lake-vintage-poster.webp",
        "day1-morning-05-west-lake-watercolor-sketch.webp",
        "day1-morning-06-west-lake-clay-isometric.webp",
        "day1-afternoon-01-qingteng-teahouse-anime.webp",
        "day1-afternoon-02-hefang-street-film.webp",
        "day1-afternoon-03-hubin-neon-night.webp",
        "day1-afternoon-04-route-collage-fashion.webp",
        "day1-afternoon-05-bauhaus-itinerary.webp",
        "day1-afternoon-06-ink-gold-evening.webp",
        "day2-morning-01-lingyin-anime.webp",
        "day2-morning-02-lingyin-editorial.webp",
        "day2-morning-03-feilai-peak-gouache.webp",
        "day2-morning-04-faxi-yellow-wall-minimal.webp",
        "day2-morning-05-temple-details-editorial.webp",
        "day2-morning-06-temple-eaves-rainprint.webp",
        "day2-afternoon-01-longjing-fields-editorial.webp",
        "day2-afternoon-02-manjuelong-courtyard-gouache.webp",
        "day2-afternoon-03-longjing-road-poster.webp",
        "day2-afternoon-04-tea-table-editorial.webp",
        "day2-afternoon-05-xiaohe-canal-dusk.webp",
        "day2-afternoon-06-xiaohe-cafe-anime.webp",
    ]

    for src, name in zip(files, names):
        dest = out_dir / name
        with Image.open(src) as im:
            im = im.convert("RGB")
            width, height = im.size
            if width > 1600:
                new_height = round(height * 1600 / width)
                im = im.resize((1600, new_height), Image.LANCZOS)
            im.save(dest, "WEBP", quality=82, method=6)
        print(dest.name)


if __name__ == "__main__":
    main()
