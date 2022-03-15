import React from "react";
import JokeTellerForm from "./JokeTellerForm";
import Home from "./Home";
// import { shallow, mount } from 'enzyme';
import {
    render,
    screen,
    cleanup,
    fireEvent,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

afterEach(() => {
    cleanup();
});

// default category selected should be 'Any'
test("default category selected should be Any", () => {
    render(<JokeTellerForm />);

    const categoryAny = screen.getByTestId('Any');
    const categoryCustom = screen.getByTestId('Custom');

    expect(categoryAny).toBeChecked();
    expect(categoryCustom).not.toBeChecked();

});

//custom categories should be disabled before selecting custom radio
test('custom categories should be disabled before selecting custom radio', () => {
    render(<JokeTellerForm />);
    const customBtn = screen.getByTestId('Custom');
    const Programming = screen.getByTestId('Programming');
    const Misc = screen.getByTestId('Misc');
    const Dark = screen.getByTestId('Dark');
    const Pun = screen.getByTestId('Pun');
    const Spooky = screen.getByTestId('Spooky');
    const Christmas = screen.getByTestId('Christmas');

    //check for disablity
    expect(Programming).toBeDisabled();
    expect(Misc).toBeDisabled();
    expect(Dark).toBeDisabled();
    expect(Pun).toBeDisabled();
    expect(Spooky).toBeDisabled();
    expect(Christmas).toBeDisabled();

    //click on custom jokes
    userEvent.click(customBtn);

    //check for not disable
    expect(Programming).not.toBeDisabled();
    expect(Misc).not.toBeDisabled();
    expect(Dark).not.toBeDisabled();
    expect(Pun).not.toBeDisabled();
    expect(Spooky).not.toBeDisabled();
    expect(Christmas).not.toBeDisabled();
})

//default language selected should be english
test('default language selected should be english', () => {
    render(<JokeTellerForm />);

    const languageDropdown = screen.getByTestId('select-language');

    const options = screen.getAllByTestId('select-option');
    // console.log(options);
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeFalsy();
    expect(options[5].selected).toBeFalsy();

})

//should blacklist working
test('should blacklist working', () => {
    render(<JokeTellerForm />);

    const nsfw = screen.getByTestId('nsfw');
    const religious = screen.getByTestId('religious');
    const political = screen.getByTestId('political');
    const racist = screen.getByTestId('racist');
    const sexist = screen.getByTestId('sexist');
    const explicit = screen.getByTestId('explicit');

    //check for not selected
    expect(nsfw).not.toBeChecked();
    expect(religious).not.toBeChecked();
    expect(political).not.toBeChecked();
    expect(racist).not.toBeChecked();
    expect(sexist).not.toBeChecked();
    expect(explicit).not.toBeChecked();

    //click on flags
    userEvent.click(nsfw);
    userEvent.click(religious);
    userEvent.click(political);

    //check for blacklist
    expect(nsfw).toBeChecked();
    expect(religious).toBeChecked();
    expect(political).toBeChecked();
    expect(racist).not.toBeChecked();
    expect(sexist).not.toBeChecked();
    expect(explicit).not.toBeChecked();
})

//should joke type working
test('should joke type working', () => {
    render(<JokeTellerForm />);

    const jokeTypeContainer = screen.getByTestId("jokeTypeContainer");
    const single = screen.getByTestId("single");
    const twopart = screen.getByTestId("twopart");


    expect(single).toBeChecked()
    expect(twopart).toBeChecked()

    //click on selectors
    userEvent.click(single);
    userEvent.click(twopart);

    expect(single).not.toBeChecked();
    expect(twopart).not.toBeChecked();
})

//should search string is working or not
test('should search string is working or not', () => {
    render(<JokeTellerForm />);

    const searchString = screen.getByTestId('searchString');

    expect(searchString.value).toBe("");

    //change value of input field
    fireEvent.change(searchString, { target: { value: "Hello" } });
    expect(searchString.value).toBe("Hello");

})

//amount of jokes should be changed on change
test("amount of jokes should be changed on change", () => {
    render(<JokeTellerForm />);

    const amountOfJoke = screen.getByTestId("amoutOfJokes");

    //change value of input field
    fireEvent.change(amountOfJoke, { target: { value: "4" } });
    expect(amountOfJoke.value).toBe("4");
});    
