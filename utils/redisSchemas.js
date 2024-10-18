exports.productSchema = {
  index: "idx:product",
  prefix: "product:",
  schema: {
    "$.id": {
      type: "NUMERIC",
      AS: "id",
      SORTABLE: true,
    },
    "$.name": {
      type: "TEXT",
      AS: "name",
    },
    "$.categoryId": {
      type: "NUMERIC",
      AS: "categoryId",
      SORTABLE: true,
    },
  },
};
exports.categorySchema = {
  index: "idx:category",
  prefix: "category:",
  schema: {
    "$.id": {
      type: "NUMERIC",
      AS: "id",
      SORTABLE: true,
    },
    "$.name": {
      type: "TEXT",
      AS: "name",
    },
  },
};
