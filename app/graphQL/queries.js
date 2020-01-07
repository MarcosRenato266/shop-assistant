import gql from "graphql-tag";

export const getAllItens = gql`
  {
    getAllItens {
      internalId
      name
      category
      tier
      itemImage
      perfectBuild {
        id
        rarity
        isPerfect
        perfectRune {
          name
          itemImage
        }
        perfectSpirityRune {
          name
          itemImage
        }
        prices {
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
    }
  }
`;
