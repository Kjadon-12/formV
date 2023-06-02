
const { Country, State, City } = require('country-state-city');
const Countrys = require('./countryModel')
const States = require('./stateModel')
const Cities = require('./cityModel')



const saveCountries = async () => {

const countries = Country.getAllCountries();
const countryData = countries.map(country => ({
  name: country.name,
  isoCode: country.isoCode
}));

await Countrys.insertMany(countryData);

};



const saveStates = async () => {
    const countries = await Countrys.find();
    for (const country of countries) {
      const states = State.getStatesOfCountry(country.isoCode);
      for (const state of states) {
        
       const existingState = await States.findOne({ countryCode: country.isoCode, isoCode: state.isoCode });
        if (!existingState) {
          state.countryCode = country.isoCode;
          await States.create(state);
        }
      }
    }
    console.log('States data saved!');
  };
  
  const saveCities = async () => {
    const countries = await Countrys.find();
    for (const country of countries) {
      const states = await States.find({ countryCode: country.isoCode });
      for (const state of states) {
        const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
        for (const city of cities) {
          const existingCity = await Cities.findOne({ countryCode: country.isoCode, stateCode: state.isoCode, name: city.name });
          if (!existingCity) {
            city.countryCode = country.isoCode;
            city.stateCode = state.isoCode;
            await Cities.create(city);
          }
        }
      }
    }
    console.log('Cities data saved!');
  };
  
 
// Call the functions to save the data
saveCountries();
saveStates();
saveCities();
