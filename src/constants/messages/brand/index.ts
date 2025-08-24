// src/constants/messages/brand.ts
export const BRAND_MESSAGES = {
  CREATED_SUCCESS: "Brand created successfully",
  UPDATED_SUCCESS: "Brand updated successfully",
  DELETED_SUCCESS: "Brand deleted successfully",
  LIST_SUCCESS: "Brands retrieved successfully",
  DETAIL_SUCCESS: "Brand retrieved successfully",
  NOT_FOUND: "The brand does not exist",
  ALREADY_EXISTS: "A brand with this name already exists",
  FORBIDDEN: "You do not have permission to perform this action",
  BRAND_CREATED_SUCCESS: "Brand created correctly",
  BRAND_UPDATED_SUCCESS: "Brand updated correctly",
  BRAND_DELETED_SUCCESS: "Brand deleted correctly",
  BRAND_NOT_FOUND: "Brand not found",
  BRAND_HAS_PRODUCTS:
    "The brand cannot be deleted because it has associated products",
  DUPLICATED_NAME: "Brand name already exists",
  HAS_PRODUCTS: "Brand has associated products",
} as const;
