
import { Util } from './Util'

export class Neuron {

  bias: number;
  weights: Float64Array;

  constructor(private numInputs: number, startZero = false) {
    if(!numInputs) throw new Error("Neuron: numInputs is invalid:" + numInputs);
    this.bias = startZero ? 0 : Util.rand();
    this.weights = new Float64Array(numInputs);
    for(var i = 0; i < numInputs; ++i){
      this.weights[i] = startZero ? 0 : Util.rand();
    }
  }

  public feedForward(input: Float64Array): number{
    if(input.length != this.numInputs) throw new Error("feedForward: invalid input length " + JSON.stringify(input.length) + " should be " + this.numInputs);
    var activation = this.bias;
    for(var i = 0; i < this.numInputs; ++i){
      activation += this.weights[i] * input[i];
    }
    if(isNaN(activation)){
      throw new Error("feedForward: activation NaN for " + JSON.stringify(input) + " and weights " + JSON.stringify(this.weights));
    }
    return Util.sigmoid(activation);
  }

  public feedForwardRaw(input: Float64Array): number{
    if(input.length != this.numInputs) throw new Error("feedForwardRaw: invalid input length" + JSON.stringify(input));
    var activation = this.bias;
    for(var i = 0; i < this.numInputs; ++i){
      activation += this.weights[i] * input[i];
    }
    if(isNaN(activation)){
      throw new Error("feedForwardRaw: activation NaN for " + JSON.stringify(input) + " and weights " + JSON.stringify(this.weights));
    }
    return activation;
  }

  public addInput() {
    this.numInputs++;
    var neww = new Float64Array(this.numInputs);
    for(var i = 0; i < this.numInputs - 1; ++i){
      neww[i] = this.weights[i];
    }
    this.weights = neww;
  }

  public import(weights: Float64Array, offset: number): number{
    this.bias = weights[offset];
    for(var i = 0; i < this.numInputs; ++i){
      this.weights[i] = weights[i + offset + 1];
    }
    return offset + 1 + this.numInputs;
  }
  public export(weights: Float64Array, offset: number): number{
    weights[offset] = this.bias;
    for(var i = 0; i < this.numInputs; ++i){
      weights[i + offset + 1] = this.weights[i];
    }
    return offset + 1 + this.numInputs;
  }

  public getBias(){
    return this.bias;
  }
  public putBias(x){
    this.bias = x;
  }
  public getWeights(){
    return this.weights;
  }
  public putWeights(ws: Float64Array){
    for(var i=0; i < this.numInputs; ++i){
      this.weights[i] = ws[i];
    }
  }

}
