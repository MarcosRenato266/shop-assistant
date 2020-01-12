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

export const getUserBuildItemsById = gql`
  query getUserBuildItemsById($itemId: String!) {
    itemById(itemId: $itemId) {
      name
      itemImage
    }
  }
`;

export const getItemById = gql`
  query getitemById($itemId: String!) {
    itemById(itemId: $itemId) {
      internalId
      name
      category {
        id
        categoryName
        subCategory
        categoryImage
      }
      tier
      itemImage
      perfectBuild {
        id
        rarity
        isPerfect
        perfectRune {
          name
          tier
          itemImage
        }
        perfectSpirityRune {
          internalId
          name
          tier
          itemImage
        }
        prices {
          id
          author
          moneyCheap
          moneyIndicated
          moneyExpensive
          gemsCheap
          gemsIndicated
          gemsExpensive
          worksCounter
        }
      }
      heroesThatCanUse {
        id
        className
        subClass
        goldHireCost
        gemsHireCost
        prerequisite
        criticalChancePercent
        criticalDamageTimes
        threatRating
        hp
        atk
        def
        evaPercent
        element
        equipmentSlots {
          slotNumber
          itemsAbleToUse
        }
        skillUnlock {
          newSkillAbleOnLevel
        }
      }
    }
  }
`;
