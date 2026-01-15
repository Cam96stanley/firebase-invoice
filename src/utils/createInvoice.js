export const createInvoiceTemplate = () => ({
  billFrom: {
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
  },
  billTo: {
    name: "",
    email: "",
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
  },
  invoiceDate: "",
  paymentTerms: "",
  description: "",
  items: [
    {
      id: crypto.randomUUID(),
      name: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  ],
  status: "Draft",
});
