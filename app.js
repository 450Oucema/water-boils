const scales = {
    c: "Celsius",
    f: "Fahrenheit"
}

function BoilingVerdict({celsius}) {
    if (celsius >= 100) {
        return <div className="alert alert-success">L'eau bout</div>
    } 

    return <div className="alert alert-info">L'eau ne bout pas.</div>;
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 /9
}

function toFahrenheit(celsius) {
    return celsius * 9 /5 + 32
}

function tryConvert (temperature, convert) {
    const value = parseFloat(temperature);
    if (Number.isNaN(value)) {
        return '';
    }

    return Math.round(convert(value) * 100 / 100).toString()
} 

function Column2({right, left}) {
    return (
        <div className="row">
            <div className="col-md-6">{left}</div>
            <div className="col-md-6">{right}</div>
        </div>
    )
}

class TemperatureInput extends React.Component {
    
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        const {temperature} = this.props
        const tempName = scales[this.props.scale];
        return <div className="form-group">
            <label htmlFor="celsius">Température (en {tempName})</label>
            <input type="text" className="form-control" value={temperature} placeholder={"Température en " + tempName} id={tempName} onChange={this.handleChange}/>
        </div>
    }

}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 'c',
            temperature: 20
        }
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    }

    handleTemperatureChange(temperature) {
        this.setState({temperature})
    }

    handleCelsiusChange(temperature) {
        this.setState({
            scale: 'c',
            temperature
        })
    }

    handleFahrenheitChange(temperature) {
        this.setState({
            scale: 'f',
            temperature
        })
    }


    render() {
        const {temperature, scale} = this.state
        const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius); 
        const fahrenheit = scale ==='f' ? temperature : tryConvert(celsius, toFahrenheit);
        return <div>
            <Column2 right={<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>} 
            left={<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>} />
            <BoilingVerdict celsius={parseFloat(celsius)}/>
        </div>
    }
}

ReactDOM.render(<Calculator/>, document.querySelector('#app'))