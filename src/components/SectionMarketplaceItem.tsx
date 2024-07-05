import styled from 'styled-components';

const Section = styled.section`
  .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 0 2rem;
            text-align: center;
        }

        .main-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
        }

        .marketPlaceTypes {
            display: flex;
            justify-content: center;
            gap: 2rem;
        }

        .marketPlaces-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2rem;
        }

        .marketPlaces {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .marketplace {
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            padding: 0.5rem;
            border-radius: 1rem;
            width: max-content;
            cursor: pointer;
            transition: 0.5s ease-in-out;
        }

        .marketplace:hover {
            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
                        rgba(0, 0, 0, 0.12) 0px -12px 30px,
                        rgba(0, 0, 0, 0.12) 0px 4px 6px,
                        rgba(0, 0, 0, 0.17) 0px 12px 13px,
                        rgba(0, 0, 0, 0.09) 0px -3px 5px;
        }

        .image {
            margin-bottom: 1rem;
        }

        .name {
            display: flex;
            color: #222222;
            align-items: center;
            justify-content: space-between;
            padding: 0 1rem;
        }

        .username {
            color: #555555;
            font-size: 0.8rem;
            padding: 0 1rem;
            margin-bottom: 0.5rem;
        }

        .price-container {
            padding: 0 1rem;
            display: flex;
            justify-content: space-between;
            color: #02204e;
        }

        .actions {
            gap: 4rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        @media screen and (min-width: 280px) and (max-width: 1080px) {
            .container {
                flex-direction: column;
                height: auto;
                align-items: right
                justify-content: center;
            }

            .marketPlaces-container {
                flex-direction: column;
                align-items: center;
            }

            .actions {
                margin-left: 4rem;
                margin-top: 2rem;
            }
        }
`;

export default Section;