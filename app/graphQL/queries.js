import gql from "graphql-tag";

export const getAllCategories = gql`
  {
    allCategories {
      id
      categoryName
      subCategory
      categoryImage
    }
  }
`;

export const getAllItens = gql`
  {
    getAllItens {
      internalId
      name
      category {
        categoryName
        subCategory
        categoryImage
      }
      tier
      itemImage
      heroesThatCanUse {
        className
        subClass
      }
    }
  }
`;

export const getAllItensForCard = gql`
  {
    getAllItens {
      internalId
      name
      category {
        categoryName
        subCategory
        categoryImage
      }
      tier
      itemImage
    }
  }
`;
