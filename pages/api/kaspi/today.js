export default async function handler(req, res) {
  const TOKEN = process.env.KASPI_API_TOKEN;
  const states = ['NEW','PROCESSING','COMPLETED','CANCELLED'];
  const results = {};
  await Promise.all(states.map(async (state) => {
    const r = await fetch(
      `https://kaspi.kz/shop/api/v2/orders?page[number]=0&page[size]=100&filter[orders][state]=${state}`,
      { headers: {'X-Auth-Token': TOKEN, 'Accept': 'application/json'} }
    );
    results[state] = await r.json();
  }));
  res.status(200).json(results);
}
