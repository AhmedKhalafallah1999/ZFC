import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
const LeagueTable = ({ Data }) => {
  const [dataTable, setdataTable] = useState([]);
  useEffect(() => {
    setdataTable(Data);
  }, [dataTable, Data]);
  return (
    <Wrapper>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Pos.</TableHeader>
            <TableHeader>Club</TableHeader>
            <TableHeader>Played</TableHeader>
            <TableHeader>Won</TableHeader>
            <TableHeader>Drawn</TableHeader>
            <TableHeader>Lost</TableHeader>
            <TableHeader>GD</TableHeader>
            <TableHeader>Points</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {dataTable.map((team, index) => {
            return (
              <TableRow key={index}>
                <TableData>{team.stats.rank}</TableData>
                <ClubData>
                  <Logo src={team.team.logo} alt="Club Logo" />
                  {team.team.name}
                </ClubData>
                <TableData>{team.stats.gamesPlayed}</TableData>
                <TableData>{team.stats.wins}</TableData>
                <TableData>{team.stats.ties}</TableData>
                <TableData>{team.stats.losses}</TableData>
                <TableData>{team.stats.goalsFor}</TableData>
                <TableData>{team.stats.points}</TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

// Styled Components
const Wrapper = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  /* overflow-x: hidden; */
  /* width: var(--fluid-width);
  max-width: var(--max-width);
  display: flex; 
  margin: 0 auto; */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  background-color: var(--primary-600);
  color: #fff;
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 25px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Logo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const ClubData = styled.td`
  display: flex;
  align-items: center;
  margin-top: 1.2rem;
`;

export default LeagueTable;
