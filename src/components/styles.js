import styled from 'styled-components';


export const size = {
  xs: 380,
  sm: 768,
  lg: 1200
};
export const device = {
  xs: `(max-width: ${size.xs}px)`,
  sm: `(max-width: ${size.sm}px)`,
  lg: `(max-width: ${size.lg}px)`
};


export const Footer = styled.div`
  position: relative;
  z-index: 1301;
  background-color: #4d4e54;
  border-radius: 0 0 10px 10px;
  padding: 11px 24px 11px 24px;
  border: 1px solid #4d4e54;

  @media (max-width: 768px) {
    height: auto;
    .media-toolbar {
      max-height:
      align-items: center;
      margin-top: 14px;
      .media-toolbar-icons{
        order: 1;
        margin-right: 10px;
      }
      .media-toolbar-content{
        order: 3;
        left: 50%;
        width: calc(100vw - 80px);
        position: absolute;
        z-index: 999;
        bottom: 114px;
        margin-right: 0 !important;
        transform: translateX(-50%);
      }
      .media-toolbar-buttons{
        order: 2;
      }
    }
  }
`;


export const AliceFooter = styled.div`
  position: relative;
  padding: 0px 24px 11px 24px;
  max-width: 519px;
  width: 100%;
  .media-toolbar {
    margin-top: 30px;
  }

  @media (max-width: 768px) {
    z-index: 1302;
    height: auto;
    padding: 0px;
    .media-toolbar {
      align-items: center;
      margin-top: 14px;
      .media-toolbar-icons{
        order: 1;
        margin-right: 10px;
      }
      .media-toolbar-content{
        order: 3;
        left: 50%;
        width: calc(100vw - 80px);
        position: absolute;
        z-index: 999;
        bottom: 114px;
        margin-right: 0 !important;
        transform: translateX(-50%);
      }
      .media-toolbar-buttons{
        order: 2;
      }
    }
  }
`;


export const MobileFooter = styled.div`
  position: relative;
  width: 100%;
  height: 135px;
  background-color: #2d333b;
  .container-fluid {
    .row:nth-child(2) {
      border-top: 1px solid #21262b;
    }
  }
`;

export const FooterMenu = styled.div`
  height: 64px;
  span {
    font-size: 1.1em;
    font-weight: 500;
    text-align: center;
  }
`;
export const FooterLeftMenu1 = styled(FooterMenu)`
  min-width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
  border-radius: 50%;
`;
export const FooterLeftMenu2 = styled(FooterMenu)`
  min-width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
  border-radius: 50%;
`;
export const FooterLeftMenu3 = styled(FooterMenu)`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
  border-radius: 50%;
`;
export const FooterCenterMenu1 = styled(FooterMenu)`
  /* margin-left: calc(50% - 197px); */

  @media only screen and ${device.xs} {
  }
  @media only screen and ${device.sm} {
    background-color: #2d333b;
    padding: 0px 8px;
  }
  @media only screen and ${device.lg} {
  }
`;

export const FooterCenterMenu2 = styled(FooterMenu)`
  /* margin-left: calc(50% - 57px); */
`;
export const FooterCenterMenu3 = styled(FooterMenu)`
  /* margin-left: calc(50% - 157px); */
`;
export const FooterRightMenu = styled(FooterMenu)`
  /* margin-left: calc(100% - 116px); */
`;

export const InfoBar = styled.div`
  position: absolute;
  z-index: 999999;
  left: 30%;
  bottom: 80px;
  background: rgba(164, 164, 164, 0.6);
  backdrop-filter: blur(44.119px);
  padding: 16px 15px;
  border-radius: 12px;
`;

export const FooterIcon = styled.img`
  max-height: 24px;
  max-width: 24px;
  cursor: pointer;
`;

export const FooterBeginIcon = styled.img`
  height: 54px;
  margin-top: 5px;
  cursor: pointer;
  box-shadow: none;
  &:hover: {
    box-shadow: none;
  }
`;

export const FooterImgSpan = styled.img`
  height: 28px;
  cursor: pointer;
`;