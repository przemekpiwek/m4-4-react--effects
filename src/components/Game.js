import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item.js";
import useInterval from "../hooks/use-interval.hook";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useKeyDown from "../hooks/useKeyDown";

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const calculateCookiesPerTick = (purchasedItems) => {
  return Object.keys(purchasedItems).reduce((accumulator, itemId) => {
    let value = purchasedItems[itemId];
    let item = items.find((item) => item.id === itemId);
    let quant = item.value;
    return accumulator + value * quant;
  }, 0);
};

const Game = () => {
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    SetnumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  const [numCookies, SetnumCookies] = useState(100);
  const [purchasedItems, SetpurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const increasePoints = () => {
    SetnumCookies(numCookies + 1);
  };

  useDocumentTitle(`${numCookies} cookies - Cookie Clicked`, "Cookie Game");
  useKeyDown("Space", increasePoints);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second
        </Indicator>
        <Button onClick={increasePoints}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          return (
            <Item
              key={index}
              index={index}
              id={item.id}
              name={item.name}
              cost={item.cost}
              value={item.value}
              numOwned={purchasedItems}
              handleClick={() => {
                if (item.cost > numCookies) {
                  console.log("nah");
                } else {
                  SetnumCookies(numCookies - item.cost);
                  SetpurchasedItems({
                    ...purchasedItems,
                    [item.id]: purchasedItems[item.id] + 1,
                  });
                }
              }}
            ></Item>
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
