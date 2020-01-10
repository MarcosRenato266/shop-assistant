import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ItemPricesBasedBuild = styled.div`
  background: transparent;
`;

const TitleSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  font-size: 14px;
  font-weight: 100;
  color: #fff;
  margin-bottom: 15px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px;
  background: #2a2f52;
  margin-bottom: 20px;
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

export default function ItemPriceBasedOnBuild(props) {
  const [PriceContent, setPriceContent] = useState(
    filterPriceOfSelectedBuildAndCount()
  );

  useEffect(() => {
    setPriceContent(filterPriceOfSelectedBuildAndCount());
  }, [props.SelectedBuild]);

  function filterPriceOfSelectedBuildAndCount() {
    const findedBuild = props.buildList.find(build => {
      return build.id === props.SelectedBuild;
    });

    const PriceSorted = findedBuild.prices.sort((a, b) => {
      if (a.worksCounter > b.worksCounter) {
        return -1;
      }
      if (b.worksCounter > a.worksCounter) {
        return 1;
      }
      return 0;
    });
    return PriceSorted;
  }

  function count(array, key) {
    return array.reduce(function(r, a) {
      return r + a[key];
    }, 0);
  }

  function returnPercentageOfWork() {
    return Math.round(
      (PriceContent[0].worksCounter * 100) / count(PriceContent, "worksCounter")
    );
  }

  console.log(PriceContent);
  return (
    <ItemPricesBasedBuild>
      <TitleSection>Perfect Build Price</TitleSection>
      <PriceRow>
        <PriceItem>
          <LabelPrice>
            <span></span>
            <span className="cheap">Cheap</span>
          </LabelPrice>
          <PriceImages>
            <span>
              <img src="https://playshoptitans.com/images/assets/ui/currency_gold.png" />
              {PriceContent[0].moneyCheap}
            </span>
            <span>
              <img src="/images/assets/ui/currency_gems.png" />
              {PriceContent[0].gemsCheap}
            </span>
          </PriceImages>
        </PriceItem>
        <PriceItem>
          <LabelPrice>
            {`Work ${returnPercentageOfWork()}% of the time`}
            <span className="indicated">Indicated</span>
          </LabelPrice>
          <PriceImages>
            <span>
              <img src="https://playshoptitans.com/images/assets/ui/currency_gold.png" />
              {PriceContent[0].moneyIndicated}
            </span>
            <span>
              <img src="/images/assets/ui/currency_gems.png" />
              {PriceContent[0].gemsIndicated}
            </span>
          </PriceImages>
        </PriceItem>
        <PriceItem>
          <LabelPrice>
            <span></span>
            <span className="expensive">Expensive</span>
          </LabelPrice>
          <PriceImages>
            <span>
              <img src="https://playshoptitans.com/images/assets/ui/currency_gold.png" />
              {PriceContent[0].moneyExpensive}
            </span>
            <span>
              <img src="/images/assets/ui/currency_gems.png" />
              {PriceContent[0].gemsExpensive}
            </span>
          </PriceImages>
        </PriceItem>
      </PriceRow>
      <TitleSection>Price For Your Item</TitleSection>
      <PriceRow>
        <PriceItem>
          <LabelPrice>
            28%
            <span className="cheap">Cheap</span>
          </LabelPrice>
          <PriceImages>
            <span>
              <img src="https://playshoptitans.com/images/assets/ui/currency_gold.png" />
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
              <img src="https://playshoptitans.com/images/assets/ui/currency_gold.png" />
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
            <span className="expensive">Expensive</span>
          </LabelPrice>
          <PriceImages>
            <span>
              <img src="https://playshoptitans.com/images/assets/ui/currency_gold.png" />
              200k
            </span>
            <span>
              <img src="/images/assets/ui/currency_gems.png" />
              30
            </span>
          </PriceImages>
        </PriceItem>
      </PriceRow>
    </ItemPricesBasedBuild>
  );
}
