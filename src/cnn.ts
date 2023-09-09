class CNN {

    private inputSize: number;
    private numFilters: number;
    private filterSize: number;
    private stride: number;
    private padding: number;
    private filters: number[][][];
  
    constructor(
	  inputSize: number,
	  numFilters: number,
	  filterSize: number,
	  stride: number,
	  padding: number
    ) {

	  this.inputSize = inputSize;
	  this.numFilters = numFilters;
	  this.filterSize = filterSize;
	  this.stride = stride;
	  this.padding = padding;
	  this.filters = [];
	  for (let i = 0; i < numFilters; i++) {

            this.filters.push(
		  new Array(filterSize).fill(0).map(() => new Array(filterSize).fill(Math.random()))
            );
	  
        }
    
    }
  
    convolve(input: number[][]): number[][][] {

	  const outputSize = Math.floor(
            (this.inputSize + 2 * this.padding - this.filterSize) / this.stride
	  ) + 1;
	  const output: number[][][] = new Array(this.numFilters)
            .fill(0)
            .map(() => new Array(outputSize).fill(0).map(() => new Array(outputSize).fill(0)));
	  for (let f = 0; f < this.numFilters; f++) {

            for (let i = 0; i < outputSize; i++) {

		  for (let j = 0; j < outputSize; j++) {

                    let sum = 0;
                    for (let k = 0; k < this.filterSize; k++) {

			  for (let l = 0; l < this.filterSize; l++) {

                            const ii = i * this.stride + k - this.padding;
                            const jj = j * this.stride + l - this.padding;
                            if (ii >= 0 && ii < this.inputSize && jj >= 0 && jj < this.inputSize) {

				  sum += input[ii][jj] * this.filters[f][k][l];
                            
                            }
			  
                        }
                    
                    }
                    output[f][i][j] = sum;
		  
                }
            
            }
	  
        }
	  return output;
    
    }

}
  
export default CNN;
  
