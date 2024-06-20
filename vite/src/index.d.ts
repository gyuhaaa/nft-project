interface Window {
  ethereum: any;
}

interface NftMetadata {
  name: string;
  description: string;
  image: string;
}

interface StsNftMetadata extends NftMetadata {
  tokenId: number;
  amount: number;
}

interface IMyQuizData {
  // id: number;
  owner: string;
  answer: string;
  description: string;
  questionImage: string;
  // answerImage: string | null;
}
