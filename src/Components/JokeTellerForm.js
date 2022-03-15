import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";

// import Enzyme from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// Enzyme.configure({ adapter: new Adapter() });

// import * as Yup from 'yup';

// const validateJokeTeller = Yup.object().shape({
//     category: Yup.string()
//         .min
// })

export class JokeTellerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                category: "Any",
                customCategories: [],
                language: "",
                flags: "",
                jokeType: ["single", "twopart"],
                searchString: "",
                idRangeFrom: 0,
                idRangeTo: 1368,
                amount: 1,
            },
            url: "https://v2.jokeapi.dev/joke/Any",
            data: {},
            errors: {},
            jokesInfo: {},
            deliveryAccess: false,
        };
    }

    componentDidMount() {
        // console.log(this.state)
    }

    componentDidUpdate() {
        // if (Object.keys(this.state.jokesInfo).length === 0) {
        //     this.setState({ jokesInfo: this.props.jokesInfo });
        // }

        // console.log(this.state.jokesInfo)
        // console.log(this.state)
    }

    /* handleLanguage(e) {
          let lang = e.target.value
          let range = this.props.jokesInfo.idRange
          this.setState({ values: { ...this.state.values, language: e.target.value, idRangeTo: range[lang][1] } })
      } */

    getJokesData(errors, amount) {
        if (Object.keys(errors).length === 0) {
            axios
                .get(this.state.url)
                .then((res) => this.setState({ data: res.data }));

            this.setState({ errors: {} });

            if (amount > 1) {
                let temp = [];
                for (let i = 0; i < amount; i++) {
                    temp.push(false);
                }
                this.setState({ deliveryAccess: temp });
            } else {
                this.setState({ deliveryAccess: false });
            }
        } else {
            this.setState({ errors: errors });
        }
    }

    render() {
        // console.log(this.state.data);

        return (
            <>
                <Formik
                    // enableReinitialize={true}
                    initialValues={this.state.values}
                    validate={async (values) => {
                        console.log(values);
                        let count = 0;
                        const Placeholder = () => {
                            if (count === 0) {
                                count = 1;
                                return "?";
                            } else {
                                return "&";
                            }
                        };

                        // let myUrl = `https://v2.jokeapi.dev/joke/${values.category === 'Any' ? 'Any' : values.customCategories.length > 0 ? values.customCategories : 'Any'}${values.language !== '' && values.language !== 'en' ? Placeholder() + 'lang=' + values.language : ''}${values.flags.length > 0 ? Placeholder() + 'blacklistFlags=' + values.flags : ''}${values.jokeType.length === 1 ? Placeholder() + 'type=' + values.jokeType : ''}${values.searchString !== '' ? Placeholder() + 'contains=' + values.searchString : ''}${values.idRangeFrom > 0 || values.idRangeTo < this.state.values.idRangeTo ? Placeholder() + 'idRange=' + values.idRangeFrom + '-' + values.idRangeTo : ''}${values.amount > 1 ? Placeholder() + 'amount=' + values.amount : ''}`
                        let myUrl = `https://v2.jokeapi.dev/joke/`;

                        const errors = {};

                        if (
                            values.category !== "Any" &&
                            values.customCategories.length === 0
                        ) {
                            errors.category = "Required";
                            myUrl += "Any";
                        } else {
                            myUrl +=
                                values.category === "Any"
                                    ? "Any"
                                    : values.customCategories.length > 0
                                        ? values.customCategories
                                        : "Any";
                        }

                        myUrl +=
                            values.language !== "" && values.language !== "en"
                                ? Placeholder() + "lang=" + values.language
                                : "";
                        myUrl +=
                            values.flags.length > 0
                                ? Placeholder() + "blacklistFlags=" + values.flags
                                : "";

                        if (values.jokeType.length === 0) {
                            errors.jokeType = "Required";
                        } else {
                            myUrl +=
                                values.jokeType.length === 1
                                    ? Placeholder() + "type=" + values.jokeType
                                    : "";
                        }

                        myUrl +=
                            values.searchString !== ""
                                ? Placeholder() + "contains=" + values.searchString
                                : "";

                        if (
                            values.idRangeFrom > values.idRangeTo ||
                            values.idRangeFrom < 0 ||
                            values.idRangeTo >
                            (values.language === ""
                                ? 1368
                                : this.props.jokesInfo.idRange[values.language][1]) ||
                            values.idRangeFrom === "" ||
                            values.idRangeTo === ""
                        ) {
                            errors.idRangeFrom = "Required";
                        } else {
                            myUrl +=
                                values.idRangeFrom > 0 ||
                                    values.idRangeTo <
                                    (values.language === ""
                                        ? 1368
                                        : this.props.jokesInfo.idRange[values.language][1])
                                    ? Placeholder() +
                                    "idRange=" +
                                    values.idRangeFrom +
                                    "-" +
                                    values.idRangeTo
                                    : "";
                        }
                        if (values.amount < 1 || values.amount > 10) {
                            errors.amount = "Required";
                        } else {
                            // for(let i = 0; i < amount;)
                            myUrl +=
                                values.amount > 1
                                    ? Placeholder() + "amount=" + values.amount
                                    : "";
                        }

                        this.setState({ url: myUrl });

                        return errors;
                    }}
                >
                    {(
                        {
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            handleReset,
                            resetForm,
                            /* and other goodies */
                        },
                        onChange = (e) => {
                            if (Object.keys(this.props.jokesInfo).length === 0) {
                                values.idRangeFrom = 0;
                                values.idRangeTo = 1368;
                            } else {
                                values.idRangeFrom =
                                    this.props.jokesInfo?.idRange[e.target.value][0];
                                values.idRangeTo =
                                    this.props.jokesInfo?.idRange[e.target.value][1];
                            }
                            // this.handleLanguage(e);
                            return handleChange(e);
                        }
                    ) => (
                        <div className="container">
                            {/* {console.log(Object.keys(errors).length)}
                            {Object.keys(this.state.jokesInfo).length === 0 ? console.log("first") : console.log("second")} */}
                            <Form className="mt-3" onSubmit={handleSubmit}>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label column sm="3">
                                        Select category / categories:
                                    </Form.Label>
                                    <Col
                                        sm="8"
                                        className="inputField"
                                        style={{ borderColor: `${errors.category ? "red" : ""}` }}
                                    >
                                        <Form.Check
                                            type="radio"
                                            id={`default-radio1`}
                                            data-testid='Any'
                                            label={`Any`}
                                            name="category"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            checked={values.category === "Any"}
                                            value="Any"
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            id={`default-radio2`}
                                            data-testid='Custom'
                                            label={`Custom:`}
                                            name="category"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value=""
                                        />
                                        <Form.Check
                                            key={`category-1`}
                                            inline
                                            label={`Programming`}
                                            name="customCategories"
                                            type="checkbox"
                                            id={`category-1`}
                                            data-testid={`Programming`}
                                            disabled={values.category === "Any"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`Programming`}
                                        />
                                        <Form.Check
                                            key={`category-2`}
                                            inline
                                            label={`Misc`}
                                            name="customCategories"
                                            type="checkbox"
                                            id={`category-2`}
                                            data-testid={`Misc`}
                                            disabled={values.category === "Any"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`Misc`}
                                        />
                                        <Form.Check
                                            key={`category-3`}
                                            inline
                                            label={`Dark`}
                                            name="customCategories"
                                            type="checkbox"
                                            id={`category-3`}
                                            data-testid={`Dark`}
                                            disabled={values.category === "Any"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`Dark`}
                                        />
                                        <Form.Check
                                            key={`category-4`}
                                            inline
                                            label={`Pun`}
                                            name="customCategories"
                                            type="checkbox"
                                            id={`category-4`}
                                            data-testid={`Pun`}
                                            disabled={values.category === "Any"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`Pun`}
                                        />
                                        <Form.Check
                                            key={`category-5`}
                                            inline
                                            label={`Spooky`}
                                            name="customCategories"
                                            type="checkbox"
                                            id={`category-5`}
                                            data-testid={`Spooky`}
                                            disabled={values.category === "Any"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`Spooky`}
                                        />
                                        <Form.Check
                                            key={`category-6`}
                                            inline
                                            label={`Christmas`}
                                            name="customCategories"
                                            type="checkbox"
                                            id={`category-6`}
                                            data-testid={`Christmas`}
                                            disabled={values.category === "Any"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`Christmas`}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="formPlaintextPassword"
                                >
                                    <Form.Label column sm="3">
                                        Select language:
                                    </Form.Label>
                                    <Col sm="8" className="inputField">
                                        <Form.Select
                                            aria-label="Select language"
                                            className="select-language"
                                            defaultValue={"en"}
                                            data-testid='select-language'
                                            name="language"
                                            onChange={onChange}
                                        >
                                            <option data-testid='select-option' value="cs">cs - Czech</option>
                                            <option data-testid='select-option' value="de">de - German</option>
                                            <option data-testid='select-option' value="en">en - English</option>
                                            <option data-testid='select-option' value="es">es - Spanish</option>
                                            <option data-testid='select-option' value="fr">fr - French</option>
                                            <option data-testid='select-option' value="pt">pt - Portuguese</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label column sm="3">
                                        Select flags to blacklist:
                                    </Form.Label>
                                    <Col sm="8" className="inputField">
                                        <Form.Label column sm="2">
                                            (optional)
                                        </Form.Label>
                                        <Form.Check
                                            key={`flag-1`}
                                            inline
                                            label={`nsfw`}
                                            name="flags"
                                            type="checkbox"
                                            data-testid={`nsfw`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`nsfw`}
                                        />
                                        <Form.Check
                                            key={`flag-2`}
                                            inline
                                            label={`religious`}
                                            name="flags"
                                            type="checkbox"
                                            data-testid={`religious`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`religious`}
                                        />
                                        <Form.Check
                                            key={`flag-3`}
                                            inline
                                            label={`political`}
                                            name="flags"
                                            type="checkbox"
                                            data-testid={`political`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`political`}
                                        />
                                        <Form.Check
                                            key={`flag-4`}
                                            inline
                                            label={`racist`}
                                            name="flags"
                                            type="checkbox"
                                            data-testid={`racist`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`racist`}
                                        />
                                        <Form.Check
                                            key={`flag-5`}
                                            inline
                                            label={`sexist`}
                                            name="flags"
                                            type="checkbox"
                                            data-testid={`sexist`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`sexist`}
                                        />
                                        <Form.Check
                                            key={`flag-6`}
                                            inline
                                            label={`explicit`}
                                            name="flags"
                                            type="checkbox"
                                            data-testid={`explicit`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={`explicit`}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label column sm="3">
                                        Select at least one joke type:
                                    </Form.Label>
                                    <Col
                                        sm="8"
                                        className="inputField"
                                        data-testid={`jokeTypeContainer`}
                                        style={{ borderColor: `${errors.jokeType ? "red" : ""}` }}
                                    >
                                        <Form.Check
                                            key={`jokeType-1`}
                                            inline
                                            label={`single`}
                                            name="jokeType"
                                            type="checkbox"
                                            id={`jokeType-1`}
                                            data-testid={`single`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            checked={values.jokeType.includes('single')}
                                            value={`single`}
                                        />
                                        <Form.Check
                                            key={`jokeType-2`}
                                            inline
                                            label={`twopart`}
                                            name="jokeType"
                                            type="checkbox"
                                            id={`jokeType-2`}
                                            data-testid={`twopart`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            checked={values.jokeType.includes('twopart')}
                                            value={`twopart`}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">
                                        Search for a joke that contains this search string:
                                    </Form.Label>
                                    <Col sm="8" className="inputField">
                                        <Form.Control
                                            type="text"
                                            name="searchString"
                                            data-testid={`searchString`}
                                            placeholder="(optional)"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">
                                        Search for a joke in this ID range:
                                    </Form.Label>
                                    <Col
                                        sm="8"
                                        className="inputField"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            borderColor: `${errors.idRangeFrom ? "red" : ""}`,
                                        }}
                                    >
                                        <Form.Label column sm="2">
                                            (optional)
                                        </Form.Label>
                                        From:
                                        <Form.Control
                                            style={{ width: "20%", margin: "0 10px" }}
                                            type="number"
                                            name="idRangeFrom"
                                            data-testid='idRangeFrom'
                                            min={0}
                                            max={values.idRangeTo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.idRangeFrom}
                                        />
                                        To:
                                        <Form.Control
                                            style={{ width: "20%", margin: "0 10px" }}
                                            type="number"
                                            name="idRangeTo"
                                            data-testid='idRangeTo'
                                            min={values.idRangeFrom}
                                            max={
                                                values.language === ""
                                                    ? this.props.jokesInfo &&
                                                    this.props.jokesInfo.totalCount - 1
                                                    : this.props.jokesInfo.idRange[values.language][1]
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.idRangeTo}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="formPlaintextEmail"
                                >
                                    <Form.Label column sm="3">
                                        Amount of jokes:
                                    </Form.Label>
                                    <Col
                                        sm="8"
                                        className="inputField"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            borderColor: `${errors.amount ? "red" : ""}`,
                                        }}
                                    >
                                        <Form.Control
                                            style={{ width: "20%" }}
                                            type="number"
                                            name="amount"
                                            data-testid='amoutOfJokes'
                                            min={1}
                                            max={10}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.amount}
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>

                            <div className="mb-3" style={{ marginTop: "4rem" }}>
                                <div className="inputField" style={{ width: "fit-content" }}>
                                    <p>URL : {this.state.url}</p>
                                    <Button
                                        variant="info"
                                        style={{ marginRight: "1rem" }}
                                        onClick={resetForm}
                                    >
                                        Reset Form
                                    </Button>
                                    <Button
                                        variant="info"
                                        onClick={() => this.getJokesData(errors, values.amount)}
                                    >
                                        Send Request
                                    </Button>
                                </div>
                            </div>

                            <div className="mb-3" style={{ marginTop: "2rem" }}>
                                <div
                                    style={{
                                        minHeight: "5rem",
                                        borderLeftColor: "#b012c3",
                                        borderLeftWidth: "6px",
                                        borderLeftStyle: "solid",
                                        borderRadius: ".5rem",
                                        backgroundColor: "#201d1d",
                                    }}
                                >
                                    <p style={{ padding: "5px", margin: "0" }}>
                                        <span style={{ color: "#b012c3" }}>{"</>"}</span>
                                        Result:
                                    </p>
                                    <hr
                                        style={{
                                            color: "#b012c3",
                                            height: "3px",
                                            opacity: "100%",
                                            margin: "0",
                                        }}
                                    />
                                    {Object.keys(this.state.errors).length === 0 ? (
                                        this.state.data?.jokes ? (
                                            this.state.data.jokes.map((joke, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div style={{ padding: "10px 10px" }}>
                                                            {joke.type === "twopart" ? (
                                                                <>
                                                                    <p>{joke.setup}</p>
                                                                    {!this.state.deliveryAccess[index] && (
                                                                        <Button
                                                                            variant="success"
                                                                            onClick={() =>
                                                                                this.setState((prevState) => ({
                                                                                    ...prevState,
                                                                                    deliveryAccess:
                                                                                        prevState.deliveryAccess.map(
                                                                                            (item, ind) =>
                                                                                                ind === index ? !item : item
                                                                                        ),
                                                                                }))
                                                                            }
                                                                        >
                                                                            Show Answer
                                                                        </Button>
                                                                    )}
                                                                    {this.state.deliveryAccess[index] && (
                                                                        <p>{joke.delivery}</p>
                                                                    )}
                                                                </>
                                                            ) : joke.type === "single" ? (
                                                                <p>{joke.joke}</p>
                                                            ) : (
                                                                <p>
                                                                    (Set parameters and click "Send Request"
                                                                    above)
                                                                </p>
                                                            )}
                                                        </div>
                                                        <hr className="joke-divider" />
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div style={{ padding: "10px 10px" }}>
                                                {this.state.data.type === "twopart" ? (
                                                    <>
                                                        <p>{this.state.data.setup}</p>
                                                        {!this.state.deliveryAccess && (
                                                            <Button
                                                                variant="success"
                                                                onClick={() =>
                                                                    this.setState({
                                                                        deliveryAccess: !this.state.deliveryAccess,
                                                                    })
                                                                }
                                                            >
                                                                Show Answer
                                                            </Button>
                                                        )}
                                                        {this.state.deliveryAccess && (
                                                            <p>{this.state.data.delivery}</p>
                                                        )}
                                                    </>
                                                ) : this.state.data.type === "single" ? (
                                                    <p>{this.state.data.joke}</p>
                                                ) : (
                                                    <p>(Set parameters and click "Send Request" above)</p>
                                                )}
                                            </div>
                                        )
                                    ) : (
                                        <div style={{ padding: "10px 10px" }}>
                                            {
                                                <>
                                                    <p>Error:</p>
                                                    <p>
                                                        One or more of the parameters you specified are
                                                        invalid. They are outlined with a red border.
                                                    </p>
                                                    <p>Please correct the parameters and try again.</p>
                                                </>
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
            </>
        );
    }
}

export default JokeTellerForm;
