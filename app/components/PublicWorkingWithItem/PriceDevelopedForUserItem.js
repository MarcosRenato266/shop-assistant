import React from "react";
import styled from "styled-components";
import BuildItemCardOnPriceUser from "./BuildItemCardOnPriceUser";

const ItemOnPriceHolder = styled.div`
  width: 30%;
  margin: 0 auto;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px;
  background: #2a2f52;
  margin-bottom: 20px;
  opacity: ${props => props.opacity};
`;

const PriceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LabelPrice = styled.div`
  text-align: center;
  font-size: 12px;
  color: #586090;
  span {
    color: #fff;
    display: block;
    padding: 3px 10px;
    border-radius: 10px;
    margin-bottom: 8px;
    &.cheap {
      background: #29af96;
    }
    &.indicated {
      background: #2daf2b;
    }
    &.expensive {
      background: #af2929;
    }
  }
`;

const PriceImages = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
    }
  }
  span:first-child {
    margin-right: 10px;
  }
`;

export default function PriceDevelopedForUserItem(props) {
  return (
    <>
      <ItemOnPriceHolder>
        <BuildItemCardOnPriceUser userBuildData={props.UserBuild} />
      </ItemOnPriceHolder>
      <PriceRow>
        <PriceItem>
          <LabelPrice>
            <p></p>
            <span className="cheap">Cheap</span>
          </LabelPrice>
          <PriceImages>
            <span>
              <img src="images/assets/ui/currency_gold.png" />
              200k
            </span>
            <span>
              <img src="/images/assets/ui/currency_gems.png" />
              30
            </span>
          </PriceImages>
        </PriceItem>
        <PriceItem>
          <LabelPrice>
            28%
            <span className="indicated">Indicated</span>
          </LabelPrice>
          <PriceImages>
            <span>
              <img src="images/assets/ui/currency_gold.png" />
              200k
            </span>
            <span>
              <img src="/images/assets/ui/currency_gems.png" />
              30
            </span>
          </PriceImages>
        </PriceItem>
        <PriceItem>
          <LabelPrice>
            <p></p>
            <span className="expensive">Expensive</span>
          </LabelPrice>
          <PriceImages>
            <span>
              <img src="images/assets/ui/currency_gold.png" />
              200k
            </span>
            <span>
              <img src="/images/assets/ui/currency_gems.png" />
              30
            </span>
          </PriceImages>
        </PriceItem>
      </PriceRow>
    </>
  );
}
