let main = {

  variables: {
    turn: 'w',
    selectedpiece: '',
    highlighted: [],

    pieces: {

      // WHITE PIECES
      w_king: {
        position: '5_1',
        img: '♔',
        captured: false,
        moved: false,
        type: 'w_king'
      },

      w_queen: {
        position: '4_1',
        img: '♕',
        captured: false,
        moved: false,
        type: 'w_queen'
      },

      w_rook1: {
        position: '1_1',
        img: '♖',
        captured: false,
        moved: false,
        type: 'w_rook'
      },

      w_rook2: {
        position: '8_1',
        img: '♖',
        captured: false,
        moved: false,
        type: 'w_rook'
      },

      w_bishop1: {
        position: '3_1',
        img: '♗',
        captured: false,
        moved: false,
        type: 'w_bishop'
      },

      w_bishop2: {
        position: '6_1',
        img: '♗',
        captured: false,
        moved: false,
        type: 'w_bishop'
      },

      w_knight1: {
        position: '2_1',
        img: '♘',
        captured: false,
        moved: false,
        type: 'w_knight'
      },

      w_knight2: {
        position: '7_1',
        img: '♘',
        captured: false,
        moved: false,
        type: 'w_knight'
      },

      w_pawn1: {
        position: '1_2',
        img: '♙',
        captured: false,
        moved: false,
        type: 'w_pawn'
      },

      w_pawn2: {
        position: '2_2',
        img: '♙',
        captured: false,
        moved: false,
        type: 'w_pawn'
      },

      w_pawn3: {
        position: '3_2',
        img: '♙',
        captured: false,
        moved: false,
        type: 'w_pawn'
      },

      w_pawn4: {
        position: '4_2',
        img: '♙',
        captured: false,
        moved: false,
        type: 'w_pawn'
      },

      w_pawn5: {
        position: '5_2',
        img: '♙',
        captured: false,
        moved: false,
        type: 'w_pawn'
      },

      w_pawn6: {
        position: '6_2',
        img: '♙',
        captured: false,
        moved: false,
        type: 'w_pawn'
      },

      w_pawn7: {
        position: '7_2',
        img: '♙',
        captured: false,
        moved: false,
        type: 'w_pawn'
      },

      w_pawn8: {
        position: '8_2',
        img: '♙',
        captured: false,
        moved: false,
        type: 'w_pawn'
      },

      // BLACK PIECES
      b_king: {
        position: '5_8',
        img: '♚',
        captured: false,
        moved: false,
        type: 'b_king'
      },

      b_queen: {
        position: '4_8',
        img: '♛',
        captured: false,
        moved: false,
        type: 'b_queen'
      },

      b_rook1: {
        position: '1_8',
        img: '♜',
        captured: false,
        moved: false,
        type: 'b_rook'
      },

      b_rook2: {
        position: '8_8',
        img: '♜',
        captured: false,
        moved: false,
        type: 'b_rook'
      },

      b_bishop1: {
        position: '3_8',
        img: '♝',
        captured: false,
        moved: false,
        type: 'b_bishop'
      },

      b_bishop2: {
        position: '6_8',
        img: '♝',
        captured: false,
        moved: false,
        type: 'b_bishop'
      },

      b_knight1: {
        position: '2_8',
        img: '♞',
        captured: false,
        moved: false,
        type: 'b_knight'
      },

      b_knight2: {
        position: '7_8',
        img: '♞',
        captured: false,
        moved: false,
        type: 'b_knight'
      },

      b_pawn1: {
        position: '1_7',
        img: '♟',
        captured: false,
        moved: false,
        type: 'b_pawn'
      },

      b_pawn2: {
        position: '2_7',
        img: '♟',
        captured: false,
        moved: false,
        type: 'b_pawn'
      },

      b_pawn3: {
        position: '3_7',
        img: '♟',
        captured: false,
        moved: false,
        type: 'b_pawn'
      },

      b_pawn4: {
        position: '4_7',
        img: '♟',
        captured: false,
        moved: false,
        type: 'b_pawn'
      },

      b_pawn5: {
        position: '5_7',
        img: '♟',
        captured: false,
        moved: false,
        type: 'b_pawn'
      },

      b_pawn6: {
        position: '6_7',
        img: '♟',
        captured: false,
        moved: false,
        type: 'b_pawn'
      },

      b_pawn7: {
        position: '7_7',
        img: '♟',
        captured: false,
        moved: false,
        type: 'b_pawn'
      },

      b_pawn8: {
        position: '8_7',
        img: '♟',
        captured: false,
        moved: false,
        type: 'b_pawn'
      }

    }

  },

  methods: {

    setupBoard() {

      $('.gamecell').html('');
      $('.gamecell').attr('chess', 'null');

      for (let piece in main.variables.pieces) {

        let currentPiece = main.variables.pieces[piece];

        if (!currentPiece.captured) {

          $('#' + currentPiece.position)
            .html(currentPiece.img)
            .attr('chess', piece);

        }

      }

    },

    clearHighlights() {

      $('.gamecell').removeClass('green selected capture');

      main.variables.highlighted = [];

    },

    highlightMoves(moves) {

      moves.forEach(move => {

        $('#' + move).addClass('green');

      });

    },

    getPiecePosition(pieceName) {

      let position = main.variables.pieces[pieceName].position;

      return {
        x: parseInt(position.split('_')[0]),
        y: parseInt(position.split('_')[1])
      };

    },

    isInsideBoard(x, y) {

      return x >= 1 && x <= 8 && y >= 1 && y <= 8;

    },

    getCell(x, y) {

      return $('#' + x + '_' + y);

    },

    generateMoves(pieceName) {

      let piece = main.variables.pieces[pieceName];

      let pos = main.methods.getPiecePosition(pieceName);

      let moves = [];

      let color = piece.type[0];

      // PAWN
      if (piece.type.includes('pawn')) {

        let dir = color === 'w' ? 1 : -1;

        let front = pos.x + '_' + (pos.y + dir);

        if ($('#' + front).attr('chess') === 'null') {

          moves.push(front);

          // FIRST MOVE DOUBLE STEP
          if (!piece.moved) {

            let doubleFront = pos.x + '_' + (pos.y + dir * 2);

            if ($('#' + doubleFront).attr('chess') === 'null') {

              moves.push(doubleFront);

            }

          }

        }

        // CAPTURE LEFT
        let leftX = pos.x - 1;

        let leftY = pos.y + dir;

        if (main.methods.isInsideBoard(leftX, leftY)) {

          let leftCell = $('#' + leftX + '_' + leftY);

          let leftPiece = leftCell.attr('chess');

          if (leftPiece !== 'null' && leftPiece[0] !== color) {

            moves.push(leftX + '_' + leftY);

          }

        }

        // CAPTURE RIGHT
        let rightX = pos.x + 1;

        let rightY = pos.y + dir;

        if (main.methods.isInsideBoard(rightX, rightY)) {

          let rightCell = $('#' + rightX + '_' + rightY);

          let rightPiece = rightCell.attr('chess');

          if (rightPiece !== 'null' && rightPiece[0] !== color) {

            moves.push(rightX + '_' + rightY);

          }

        }

      }

      // KNIGHT
      else if (piece.type.includes('knight')) {

        let knightMoves = [
          [1, 2], [2, 1], [-1, 2], [-2, 1],
          [1, -2], [2, -1], [-1, -2], [-2, -1]
        ];

        knightMoves.forEach(move => {

          let x = pos.x + move[0];
          let y = pos.y + move[1];

          if (main.methods.isInsideBoard(x, y)) {

            let target = $('#' + x + '_' + y).attr('chess');

            if (target === 'null' || target[0] !== color) {

              moves.push(x + '_' + y);

            }

          }

        });

      }

      return moves;

    },

    movePiece(targetId) {

      let selectedCell = main.variables.selectedpiece;

      let selectedPiece = $('#' + selectedCell).attr('chess');

      let targetPiece = $('#' + targetId).attr('chess');

      // CAPTURE
      if (targetPiece !== 'null') {

        main.variables.pieces[targetPiece].captured = true;

      }

      // MOVE PIECE
      $('#' + targetId)
        .html(main.variables.pieces[selectedPiece].img)
        .attr('chess', selectedPiece);

      $('#' + selectedCell)
        .html('')
        .attr('chess', 'null');

      main.variables.pieces[selectedPiece].position = targetId;

      main.variables.pieces[selectedPiece].moved = true;

      // PAWN PROMOTION
      let piece = main.variables.pieces[selectedPiece];

      if (piece.type === 'w_pawn' && targetId.split('_')[1] == 8) {

        piece.img = '♕';
        piece.type = 'w_queen';

      }

      if (piece.type === 'b_pawn' && targetId.split('_')[1] == 1) {

        piece.img = '♛';
        piece.type = 'b_queen';

      }

      main.methods.setupBoard();

      main.methods.endTurn();

    },

    endTurn() {

      main.variables.turn =
        main.variables.turn === 'w' ? 'b' : 'w';

      $('#turn').html(
        main.variables.turn === 'w'
          ? "White's Turn"
          : "Black's Turn"
      );

      $('#turn').addClass('turn-highlight');

      setTimeout(() => {

        $('#turn').removeClass('turn-highlight');

      }, 400);

      main.variables.selectedpiece = '';

      main.methods.clearHighlights();

    }

  }

};

$(document).ready(function () {

  main.methods.setupBoard();

  $('.gamecell').click(function () {

    let clickedCell = $(this);

    let clickedId = clickedCell.attr('id');

    let clickedPiece = clickedCell.attr('chess');

    // SELECT PIECE
    if (
      main.variables.selectedpiece === '' &&
      clickedPiece !== 'null' &&
      clickedPiece[0] === main.variables.turn
    ) {

      main.variables.selectedpiece = clickedId;

      $('.gamecell').removeClass('selected');

      clickedCell.addClass('selected');

      let moves = main.methods.generateMoves(clickedPiece);

      main.variables.highlighted = moves;

      main.methods.highlightMoves(moves);

    }

    // MOVE PIECE
    else if (
      main.variables.selectedpiece !== '' &&
      main.variables.highlighted.includes(clickedId)
    ) {

      main.methods.movePiece(clickedId);

    }

    // CHANGE SELECTION
    else if (
      clickedPiece !== 'null' &&
      clickedPiece[0] === main.variables.turn
    ) {

      main.methods.clearHighlights();

      $('.gamecell').removeClass('selected');

      main.variables.selectedpiece = clickedId;

      clickedCell.addClass('selected');

      let moves = main.methods.generateMoves(clickedPiece);

      main.variables.highlighted = moves;

      main.methods.highlightMoves(moves);

    }

  });

  // RESTART BUTTON
  $('#restartBtn').click(function () {

    location.reload();

  });

});
