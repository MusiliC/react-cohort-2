import React from "react";

const TodoList = ({ newTodo }) => {
  // console.log(isComplete);

  // isComplete === true;

  // ? : -> short way of writing if...else

  const isComplete = true;

  // if (isComplete) {
  //   return  <p>{newTodo} ✅</p>;
  // }
  // return <li className="item my-5 text-center text-5xl">{newTodo}</li>;

  //! DRY -> DON'T REPEAT YOURSELF

  let namesInAnArray = ["Mary", "Tim", "Roy", "Musili", "Mary"];

  namesInAnArray[1];

  const ourList = [
    "Creola Katherine Johnson: mathematician",
    "Mario José Molina-Pasquel Henríquez: chemist",
    "Mohammad Abdus Salam: physicist",
    "Percy Lavon Julian: chemist",
    "Subrahmanyan Chandrasekhar: astrophysicist",
  ];

  return (
    <div className="w-[300px] mx-auto py-10">
      <p>Rendering my todoList</p>
      <p>Clean Code</p>
      <p>Close Sprint</p>
      {/* {isComplete ? <p>{newTodo} ✅</p> : <p>{newTodo}</p>} */}
      {isComplete && <p>{newTodo} ✅</p>}
      <p className="text-2xl">Normal Listing</p>
      <ul>
        <li>Creola Katherine Johnson: mathematician</li>
        <li>Mario José Molina-Pasquel Henríquez: chemist</li>
        <li>Mohammad Abdus Salam: physicist</li>
        <li>Percy Lavon Julian: chemist</li>
        <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
      </ul>

      <p className="text-2xl">Using Map</p>
      <ul>
        {namesInAnArray.map((list, i) => (
          <li key={i}>
            {i + 1}: {list}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
