export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  // 1º - Buscar o usuário no banco do FaunaDB com o ID {customerId}
  console.log(subscriptionId, customerId);
  // 2º - Salvar os dados da subscription no FaunaDB
}