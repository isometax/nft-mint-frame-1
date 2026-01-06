import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export default async function handler(req, res) {
  try {
    // Base chain
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.PRIVATE_KEY,
      "base"
    );

    // Senin kontrat adresin
    const contract = await sdk.getContract(
      "0x2a060046F51e09763c8D2EbC4c45c4780aACbf7f"
    );

    // Farcaster kullanıcısının cüzdan adresi
    const userAddress = req.body?.untrustedData?.address;

    if (!userAddress) {
      return res.status(400).json({
        message: "Kullanıcı adresi bulunamadı"
      });
    }

    // Mint işlemi
    const tx = await contract.erc721.claimTo(userAddress, 1);

    // Başarılı Frame cevabı
    return res.status(200).json({
      frame: {
        version: "vNext",
        image: "https://placehold.co/1200x630?text=Mint+Basarili",
        buttons: [{ label: "Minted!" }]
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      frame: {
        version: "vNext",
        image: "https://placehold.co/1200x630?text=Mint+Hatasi",
        buttons: [{ label: "Tekrar Dene" }]
      }
    });
  }
}
