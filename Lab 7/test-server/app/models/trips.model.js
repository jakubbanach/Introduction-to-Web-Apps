module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      // title: String,
      // description: String,
      // published: Boolean
      // [key: String,: any;
      id: Number,
      nazwa: String,
      docelowy_kraj: String,
      data_rozpoczecia: String,
      data_zakonczenia: String,
      cena: Number,
      miejsca: Number,
      opis: String,
      zdjecie: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Trips = mongoose.model("trips", schema);
  return Trips;
};
