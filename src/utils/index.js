const getItemAndRest = (items, id) => {
  const item = items.filter(it => it.id === id);
  const rest = items.filter(it => it.id !== id);
  return item.concat([rest]);
}

export const moveAndUpdate = (state, id, from, to, updateWith) => {
  const [todo, rest] = getItemAndRest(state[from], id);
  return {
    [from]: rest,
    [to]: state[to].concat([{ ...todo, ...updateWith }]),
  }
}