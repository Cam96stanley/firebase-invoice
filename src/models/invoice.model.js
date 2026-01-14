export const PAYMENT_TERMS = Object.freeze({
  NET_7: 7,
  NET_14: 14,
  NET_30: 30,
  NET_60: 60,
  NET_90: 90,
  NET_180: 180,
  NET_365: 365,
});

export const STATUS = Object.freeze({
  PENDING: "Pending",
  PAID: "Paid",
  DRAFT: "Draft",
});

const createInvoiceItem = (overrides = {}) => ({
  name: "",
  quantity: 0,
  price: 0,
  total: 0,
  ...overrides,
});

export const invoiceModel = (overrides = {}) => ({
  userId: "",
  invoiceNumber: "",
  billFrom: {
    name: "",
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
  paymentTerms: PAYMENT_TERMS.NET_30,
  description: "",
  items: [createInvoiceItem()],
  status: STATUS.PENDING,
  dueDate: "",
  total: 0,
  ...overrides,
});
