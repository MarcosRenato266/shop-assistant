import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FakeBuilds } from "../../data/builds";

const BuildListArea = styled.div``;

const BuildItem = styled.div`
  width: 100%;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  min-height: 100px;
  position: relative;
  margin-bottom: 30px;
`;

const BuildContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const BuildImage = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  :before {
    content: "";
    width: 60px;
    height: 60px;
    border-radius: 100%;
    position: absolute;
    margin: 0 auto;
    z-index: 0;
    background: #e2e2e2;
  }
  img {
    z-index: 2;
    width: 80px;
  }
  &.Lendary {
    img {
      filter: drop-shadow(-1px -1px 0 #dca60f40)
        drop-shadow(1px 1px 0 #dca60f40) drop-shadow(1px -1px 0 #dca60f40)
        drop-shadow(-1px 1px 0 #dca60f40) drop-shadow(0 0 8px #dca60f40)
        drop-shadow(0 0 8px #dca60f40);
    }
  }
  &.Epic {
    img {
      filter: drop-shadow(-1px -1px 0 #7413cc40)
        drop-shadow(1px 1px 0 #7413cc40) drop-shadow(1px -1px 0 #7413cc40)
        drop-shadow(-1px 1px 0 #7413cc40) drop-shadow(0 0 8px #7413cc40)
        drop-shadow(0 0 8px #7413cc40);
    }
  }
  &.Magistral {
    img {
      filter: drop-shadow(-1px -1px 0 #0f8fda40)
        drop-shadow(1px 1px 0 #0f8fda40) drop-shadow(1px -1px 0 #0f8fda40)
        drop-shadow(-1px 1px 0 #0f8fda40) drop-shadow(0 0 8px #0f8fda40)
        drop-shadow(0 0 8px #0f8fda40);
    }
  }
  &.Superior {
    img {
      filter: drop-shadow(-1px -1px 0 #41da0f40)
        drop-shadow(1px 1px 0 #41da0f40) drop-shadow(1px -1px 0 #41da0f40)
        drop-shadow(-1px 1px 0 #41da0f40) drop-shadow(0 0 8px #41da0f40)
        drop-shadow(0 0 8px #41da0f40);
    }
  }
`;

const PerfectBuild = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    text-align: center;
    margin-right: 15px;
    p {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #9f9f9f !important;
    }
  }
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    :before {
      content: "";
      width: 40px;
      height: 40px;
      border-radius: 100%;
      position: absolute;
      margin: 0 auto;
      z-index: 0;
      background: #5c3085;
    }
    img {
      z-index: 3;
      width: 50px;
      position: relative;
    }
  }
`;

const OtherBuilds = styled.div`
  padding: 5px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #f1f1f1;
  width: inherit;
  overflow-x: scroll;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const OtherItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e2e2e2;
  border-radius: 10px;
  padding: 5px;
  margin-right: 10px;
  ${BuildImage} {
    :before {
      content: "";
      width: 40px;
      height: 40px;
      border-radius: 100%;
      position: absolute;
      margin: 0 auto;
      z-index: 0;
      background: #e2e2e2;
    }
    img {
      z-index: 2;
      width: 70px;
    }
  }
  div {
    text-align: center;
    p {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #9f9f9f !important;
    }
  }
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    :before {
      content: "";
      width: 40px;
      height: 40px;
      border-radius: 100%;
      position: absolute;
      margin: 0 auto;
      z-index: 0;
      background: #9f9f9f;
    }
    img {
      z-index: 3;
      width: 50px;
      position: relative;
    }
  }
`;

export default function ListBuild() {
  const [BuildList, setBuildList] = useState(FakeBuilds);
  return (
    <BuildListArea>
      <BuildItem>
        <BuildContent>
          <BuildImage>
            <img
              src={`https://playshoptitans.com/images/assets/items/ruinssword.png`}
            />
          </BuildImage>
          <PerfectBuild>
            <div>
              <span>
                <img
                  src={`https://playshoptitans.com/images/assets/items/flaming.png`}
                />
              </span>
              <p>Ember</p>
            </div>
            <div>
              <span>
                <img
                  src={`https://playshoptitans.com/images/assets/items/owl.png`}
                />
              </span>
              <p>Owl</p>
            </div>
          </PerfectBuild>
          <OtherBuilds>
            <OtherItem>
              <BuildImage>
                <img
                  src={`https://playshoptitans.com/images/assets/items/ruinssword.png`}
                />
              </BuildImage>
              <div>
                <span>
                  <img
                    src={`https://playshoptitans.com/images/assets/items/flaming.png`}
                  />
                </span>
                <p>Ember</p>
              </div>
              <div>
                <span>
                  <img
                    src={`https://playshoptitans.com/images/assets/items/owl.png`}
                  />
                </span>
                <p>Owl</p>
              </div>
            </OtherItem>
            <OtherItem>
              <BuildImage>
                <img
                  src={`https://playshoptitans.com/images/assets/items/ruinssword.png`}
                />
              </BuildImage>
              <div>
                <span>
                  <img
                    src={`https://playshoptitans.com/images/assets/items/flaming.png`}
                  />
                </span>
                <p>Ember</p>
              </div>
              <div>
                <span>
                  <img
                    src={`https://playshoptitans.com/images/assets/items/owl.png`}
                  />
                </span>
                <p>Owl</p>
              </div>
            </OtherItem>
            <OtherItem>
              <BuildImage>
                <img
                  src={`https://playshoptitans.com/images/assets/items/ruinssword.png`}
                />
              </BuildImage>
              <div>
                <span>
                  <img
                    src={`https://playshoptitans.com/images/assets/items/flaming.png`}
                  />
                </span>
                <p>Ember</p>
              </div>
              <div>
                <span>
                  <img
                    src={`https://playshoptitans.com/images/assets/items/owl.png`}
                  />
                </span>
                <p>Owl</p>
              </div>
            </OtherItem>
            <OtherItem>
              <BuildImage>
                <img
                  src={`https://playshoptitans.com/images/assets/items/ruinssword.png`}
                />
              </BuildImage>
              <div>
                <span>
                  <img
                    src={`https://playshoptitans.com/images/assets/items/flaming.png`}
                  />
                </span>
                <p>Ember</p>
              </div>
              <div>
                <span>
                  <img
                    src={`https://playshoptitans.com/images/assets/items/owl.png`}
                  />
                </span>
                <p>Owl</p>
              </div>
            </OtherItem>
            <OtherItem>
              <BuildImage>
                <img
                  src={`https://playshoptitans.com/images/assets/items/ruinssword.png`}
                />
              </BuildImage>
              <div>
                <span>
                  <img
                    src={`https://playshoptitans.com/images/assets/items/flaming.png`}
                  />
                </span>
                <p>Ember</p>
              </div>
              <div>
                <span>
                  <img
                    src={`https://playshoptitans.com/images/assets/items/owl.png`}
                  />
                </span>
                <p>Owl</p>
              </div>
            </OtherItem>
          </OtherBuilds>
        </BuildContent>
      </BuildItem>
    </BuildListArea>
  );
}
