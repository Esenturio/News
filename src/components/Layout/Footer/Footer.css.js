import styled from 'styled-components';

export const Footer = styled.div`
  border-top: 1px solid #dee2e6;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center !important;

  @media screen and (min-width: 662px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 952px) {
    grid-template-columns: repeat(3, 1fr);
    .footer-block {
      margin: 0 auto;
    }
  }

  .footer-block {
    margin-bottom: 10px;
    max-width: 400px;
  }

  .footer__nav a {
    color: var(--text-color);
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    border-left: 5px solid white;
  }
  
  .footer__nav a.active {
    border-left-color: var(--main-color);
  }

  .footer__title {
    border-bottom: 3px solid var(--main-color);
    margin-bottom: 10px;
    display: inline-block;
    color: var(--main-color);
  }

  .footer__icons {
    display: flex;
    justify-content: space-between;
    svg {
      font-size: 30px
    }
  }

  .telegram svg {
    fill: #28A8E9
  }
  .facebook svg {
    fill: #4867AA
  }
  .instagram svg {
    fill: #A73AA6
  }

  li {
    list-style: circle !important
  }
`