
import { Util } from './Util'
import { Neuron } from './Neuron'

export class NeuronLayer{

  neurons: Neuron[];

  constructor(private numInputs: number, private numOutputs: number, startZero = false){

    this.neurons = new Array(numOutputs);
    for(var i=0; i < numOutputs; ++i){
      this.neurons[i] = new Neuron(numInputs, startZero);
    }
  }

  public feedForward(inputs: Float64Array): Float64Array{
    var res = new Float64Array(this.numOutputs);
    for(var i=0; i < this.numOutputs; ++i){
      res[i] = this.neurons[i].feedForward(inputs);
    }
    return res; // this.neurons.map(neuron => neuron.feedForward(inputs));
  }

  public feedForwardRaw(inputs: Float64Array): Float64Array{
    var res = new Float64Array(this.numOutputs);
    for(var i=0; i < this.numOutputs; ++i){
      res[i] = this.neurons[i].feedForwardRaw(inputs);
    }
    return res; // this.neurons.map(neuron => neuron.feedForwardRaw(inputs));
  }

  public addInput() {
    for(var neuron of this.neurons){
      neuron.addInput();
    }
  }
  public addNeuron(){
    this.numOutputs++;
    this.neurons[this.numOutputs - 1] = new Neuron(this.numInputs, true);
    // Then number of inputs must be increased for every neuron on the next row!!!!! ! !
  }

  public export(weights: Float64Array, offset: number): number{
    for(var i=0; i < this.numInputs; ++i){
      offset = this.neurons[i].export(weights, offset);
    }
    return offset;
  }
  public import(weights: Float64Array, offset: number): number{
    for(var i=0; i < this.numInputs; ++i){
      offset = this.neurons[i].import(weights, offset);
    }
    return offset;
  }
  public getBiases(){
    return this.neurons.map(neuron => neuron.getBias());
  }
  public putBiases(x: number[]){
    for(var i=0; i < this.neurons.length; ++i){
      this.neurons[i].putBias(x[i]);
    }
  }
  public getWeights(){
    return this.neurons.map(neuron => neuron.getWeights());
  }
  public putWeights(ws: Float64Array[]){
    for(var i=0; i < this.numOutputs; ++i){
      this.neurons[i].putWeights(ws[i]);
    }
  }

}
