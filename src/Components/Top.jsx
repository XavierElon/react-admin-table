// import React, {useState} from 'react'
// import './Top.css'

// import styled from 'styled-components'

// const Button = styled.button `
//     background: grey;
//     color: white;
//     font-size: 12px;
//     // padding: 10px 60px;
//     width: 163px;
//     height: 30px;
//     border-radius: 5px;
//     border-color: white;
//     margin: 10px 0px;
//     cursor: pointer;
// `

// function clicked() {
//     console.log("hello")
// }

// const ButtonToggle = styled(Button)`
//   background : #f2f2f2;
//   color: black;
//   ${({ active }) =>
//     active &&
//     `
//     background: #000000;
//     color: #FFFFFF;
//   `}
// `;

// const ButtonGroup = styled.div`
//   display: flex;
// `;

// const types = ['New Requests', 'Existing Entries'];

// function ToggleGroup() {
//   const [active, setActive] = useState(types[0]);
//   return (
//     <ButtonGroup>
//       {types.map(type => (
//         <ButtonToggle
//           key={type}
//           active={active === type}
//           onClick={() => setActive(type)}
//         >
//           {type}
//         </ButtonToggle>
//       ))}
//     </ButtonGroup>
//   );
// }

// export default class Table extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         }

//     }

//     newRequest() {
//         console.log("empty")
//     }

//     render() {

//         return (
//             <div className="wrapper">
//                <ToggleGroup>

//                </ToggleGroup>
//             </div>
            

//         )
//     }
// }
