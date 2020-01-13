import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import BuildItemCardOnPrice from "./BuildItemCardOnPrice";
import BuildItemCardOnPriceUser from "./BuildItemCardOnPriceUser";
import { Carousel, Icon } from "antd";

const ItemPricesBasedBuild = styled.div`
  background: transparent;
  span {
    color: #fff !important;
  }
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

const PreviousArrow = styled.div`
  font-size: 28px;
  color: #626aa0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const NextArrow = styled.div`
  font-size: 28px;
  color: #626aa0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CarouselHolder = styled.div`
  position: relative;
  flex: 1;
  ${PreviousArrow} {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }
  ${NextArrow} {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }
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

const NoData = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #464e7d;
  margin-bottom: 20px;
`;

const ItemOnPriceHolder = styled.div`
  width: 30%;
  margin: 0 auto;
`;

export default function ItemPriceBasedOnBuild(props) {
  const [PriceContent, setPriceContent] = useState(
    filterPriceOfSelectedBuildAndCount()
  );

  const priceCarouselRef = useRef("");

  useEffect(() => {
    setPriceContent(filterPriceOfSelectedBuildAndCount());
  }, [props.SelectedBuild]);

  function filterPriceOfSelectedBuildAndCount() {
    const findedBuild = props.buildList.find(build => {
      return build.id === props.SelectedBuild;
    });

    if (!findedBuild || !findedBuild.prices) {
      return false;
    }

    const PriceSorted = findedBuild.prices.sort((a, b) => {
      if (a.worksCounter > b.worksCounter) {
        return -1;
      }
      if (b.worksCounter > a.worksCounter) {
        return 1;
      }
      return 0;
    });

    if (!PriceSorted || PriceSorted.length <= 0) {
      return false;
    }

    return PriceSorted;
  }

  function count(array, key) {
    return array.reduce(function(r, a) {
      return r + a[key];
    }, 0);
  }

  function returnPercentageOfWork(price) {
    return Math.round(
      (price.worksCounter * 100) / count(PriceContent, "worksCounter")
    );
  }

  if (PriceContent === false) {
    return (
      <NoData>We can't be able to find builds or prices for this item</NoData>
    );
  }

  console.log(priceCarouselRef);

  return (
    <ItemPricesBasedBuild>
      <TitleSection>Perfect Build Price</TitleSection>
      <ItemOnPriceHolder>
        <BuildItemCardOnPrice
          buildData={props.buildList.find(
            build => build.id === props.SelectedBuild
          )}
        />
      </ItemOnPriceHolder>
      <CarouselHolder>
        <PreviousArrow
          onClick={() => priceCarouselRef.current.slick.slickPrev()}
        >
          <Icon type="caret-left" />
        </PreviousArrow>
        <NextArrow onClick={() => priceCarouselRef.current.slick.slickNext()}>
          <Icon type="caret-right" />
        </NextArrow>
        <Carousel dots={false} ref={priceCarouselRef}>
          {PriceContent.map((price, key) => (
            <div>
              <PriceRow key={price.id} opacity={key === 0 ? 1 : .5}>
                <PriceItem>
                  <LabelPrice>
                    <span></span>
                    <span className="cheap">Cheap</span>
                  </LabelPrice>
                  <PriceImages>
                    <span>
                      <img src="images/assets/ui/currency_gold.png" />
                      {price.moneyCheap}
                    </span>
                    <span>
                      <img src="/images/assets/ui/currency_gems.png" />
                      {price.gemsCheap}
                    </span>
                  </PriceImages>
                </PriceItem>
                <PriceItem>
                  <LabelPrice>
                    {`Work ${returnPercentageOfWork(price)}% of the time`}
                    <span className="indicated">Indicated</span>
                  </LabelPrice>
                  <PriceImages>
                    <span>
                      <img src="images/assets/ui/currency_gold.png" />
                      {price.moneyIndicated}
                    </span>
                    <span>
                      <img src="/images/assets/ui/currency_gems.png" />
                      {price.gemsIndicated}
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
                      <img src="images/assets/ui/currency_gold.png" />
                      {price.moneyExpensive}
                    </span>
                    <span>
                      <img src="/images/assets/ui/currency_gems.png" />
                      {price.gemsExpensive}
                    </span>
                  </PriceImages>
                </PriceItem>
              </PriceRow>
            </div>
          ))}
        </Carousel>
      </CarouselHolder>

      <TitleSection>Price For Your Item</TitleSection>
      <ItemOnPriceHolder>
        {PriceContent && (
          <BuildItemCardOnPriceUser userBuildData={props.UserBuild} />
        )}
      </ItemOnPriceHolder>
      <PriceRow>
        <PriceItem>
          <LabelPrice>
            28%
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
            28%
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
    </ItemPricesBasedBuild>
  );
}
