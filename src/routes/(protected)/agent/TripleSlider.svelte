<script>
    import RangeSlider from 'svelte-range-slider-pips';

    export let value = 50;
    export let min = 10;
    export let max = 80;
    export let maxSlide = 100;
    export let minSlide = 0;
    export let values=[10,50,80];
    $:if(values[1]<values[0]){
        values[1]=values[0];
    }
    $:if(values[1]>values[2]){
        values[1]=values[2];
    }
    $:if(values[0]!=min){
        values[0]=min;
    }
    $:if(values[2]!=max){
        values[2]=max;
    }
    $:value=values[1];
    
  </script>

<div class="slide">
    <RangeSlider pips max={maxSlide} min={minSlide} bind:values={values} step={(maxSlide-minSlide)/100} first="label" last="label" float/>
</div>

  <style>
    .slide {
        width: 100%;
        margin-top: 50px;
    }
    :root {
        --range-slider: #d9ffee;
        --range-handle-inactive: #36bf4d;
        --range-handle:  #2c7d68;
        --range-handle-focus:    #2c7d68;
        --range-pip:  #B2BEB5;
    }
</style>