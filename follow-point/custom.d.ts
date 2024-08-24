interface Snap {
  pay(
    transactionToken: string,
    options: {
      onSuccess: (result: any) => void;
    }
  ): void;
}

interface Window {
  snap: Snap;
}
