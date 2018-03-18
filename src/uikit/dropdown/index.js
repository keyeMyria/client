import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { theme } from 'colors';
 
const Box = styled.div`
  position: relative; 
  width: 100%; 
  font-size: 14px; 
`;
 
const Label = styled.div`
  font-size: 13px; 
  padding: 3px 0; 
  color: ${theme.accent2}; 
  padding: 10px 0;
`;
 
const Container = styled.div``;
 
const SelectedItem = styled.div`
  box-shadow: 0 1px 1px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  display: inline-flex; 
  background: ${theme.accent1}; 
  border-radius: 2px; 
  cursor: pointer; 
  color: ${theme.accent2.lighten(0.2)}; 
  border: none; 
  outline: none; 
  user-select: none; 
  width: 100%; 
`;
 
const SelectedItemTitle = styled.div`
  padding: 10px 0 10px 16px; 
`;

const SelectedItemIcon = styled.div`
  padding: 0 16px 0 10px; 
  display: flex; 
  align-items: center; 
  margin-left: auto; 

  i { 
    position: absolute; 
    font-size: 20px; 
  } 
`;

const Items = styled.div`
  width: 100%; 
  position: absolute;
  background: ${theme.accent1}; 
  border-top: 1px solid ${theme.dark1}; 
  z-index: 40; 
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); 
`;

const Item = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  color: ${theme.accent2.lighten(0.2)}; 

  &:hover { 
    background: ${theme.accent1.lighten(0.1)};
    color: ${theme.text1}; 
  } 
`;

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
 
    this.handleClickOutside = this.handleClickOutside.bind(this)
   
    this.state = {
      isOpen: false,
      value: props.value
    };
  }
 
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }
 
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }
 
  handleClickOutside() {
    const domNode = ReactDOM.findDOMNode(this);
 
    if (!domNode || !domNode.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }
 
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }
 
  onClickSelected() {
    this.setState({ isOpen: !this.state.isOpen });
  }


  onSelect(value) {
    const { onChange } = this.props;
 
    if( this.state.value != value ) {
      this.setState({ value, isOpen: false });
      onChange(value);
    } else {
      this.setState({ isOpen: false });
    }
  }
 
  render() {
    const { title, values } = this.props;
    const selectedItem = values.find(item => item.value == this.state.value);
 
    if (!selectedItem) {
      return false;
    }
 
    return (
      <Box>
        {title && <Label>{title}</Label>}
        <Container>
          <SelectedItem onClick={() => this.onClickSelected()}> 
            <SelectedItemTitle>{selectedItem.title}</SelectedItemTitle>
            <SelectedItemIcon>
              <i className="zmdi zmdi-caret-down"></i>
            </SelectedItemIcon>
          </SelectedItem>
          {!!this.state.isOpen && <Items>
            {values.map(item => 
              <Item
                key={item.value}
                onClick={() => this.onSelect(item.value)}>{item.title}</Item>
            )}
          </Items>}
        </Container>
      </Box>
    );
  }
}