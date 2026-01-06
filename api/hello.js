export default function handler(req, res) {
  res.status(200).json({
    frame: {
      version: "vNext",
      image: "https://placehold.co/1200x630?text=Butona+Bastın",
      buttons: [{ label: "Tamam" }]
    }
  });
}
