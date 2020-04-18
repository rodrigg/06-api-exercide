const fs = require("fs");
const dataFile = "/data/cars.json";

const resolvers = {
  Query: {
    cars: async () => {
      const cars = await getCarData();
      return cars;
    },
    car: async (parent, args) => {
      const data = getCarData();
      const matchingCar = data.find((item) => item.car_id === +args.id);
      return matchingCar;
    },
  },
  Mutation: {
    addCar: async (parent, args) => {
      console.log("guardar");
      const data = getCarData();

      const nextId = getNextAvailableId(data);
      const carEdit = {
        car_id: nextId,
        name: args.carEdit.name,
        brand: args.carEdit.brand,
        year_release: args.carEdit.year_release,
      };
      
      data.push(carEdit);
      saveCarData(data);
      //Se debería sacar a un clase de service pero como es un proyecto de ejercicios lo dejamos aqui
      return true;
    },
  },
};

module.exports = resolvers;

const getCarData = () =>
  JSON.parse(fs.readFileSync(path.join(__dirname + dataFile), "utf8"));

const saveCarData = (data) =>
  fs.writeFile(
    path.join(__dirname + dataFile),
    JSON.stringify(data, null, 4),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
const getNextAvailableId = (allCars) => {
  const carIds = allCars.map((c) => c.car_id);
  const maxValue = Math.max(...carIds);
  return maxValue + 1;
};
