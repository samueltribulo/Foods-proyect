import React from "react";
import { NavLink } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme from 'enzyme';

import LandingPage from "../components/LandingPage";

Enzyme.configure({adapter: new Adapter()});

describe('<LandingPage />', () =>{
    let wrapper;
    beforeEach(() => wrapper = Enzyme.shallow(<LandingPage />));

    it('Renderiza un h1 con el texto "Recipe app"', () =>{
        expect(wrapper.find('h1').at(0).text()).toEqual('Recipe app');
    });

    it('Deberia renderizar un p con el texto "¡Find your ideal recipe or create it!"', () =>{
        expect(wrapper.find('p').at(0).text()).toEqual('¡Find your ideal recipe or create it!');
    });
    
    it('Debería renderizar un <NavLink to="" />. que vaya a "/recipes" ', () => {
        expect(wrapper.find(NavLink)).toHaveLength(1);
        expect(wrapper.find(NavLink).at(0).prop('to')).toEqual('/recipes');
      });

    it('Deberia renderizar un span con el texto "Start".', () =>{
        expect(wrapper.find('span').at(0).text()).toEqual('Start');
    });
})
