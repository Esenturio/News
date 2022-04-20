import styled from 'styled-components';

export const ProfileCart = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: var(--text-color);
  text-align: center;
  border-radius: 10px;
  color: white;
  positioin: relative;
  .job {
    font-size: 20px;
  }
  .svg {
    font-size: 30px;
    postition: relative !important;r
    top: -50px;
    right: 0;
    transition: .3s
  }
  &:hover .svg {
    top: 0;
  }
`

export const ProfileImg = styled.div`
  margin: 0 auto;
  max-width: 300px; 
  img {
    object-fit: cover;
    width: 100%;
  }
`