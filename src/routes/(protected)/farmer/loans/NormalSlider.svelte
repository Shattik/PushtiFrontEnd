<script>
    import RangeSlider from 'svelte-range-slider-pips'

    export let values = [50, 60];
    export let min = 0;
    export let max = 100;
</script>
  
<div class="slide">
  <RangeSlider {min} {max} float pips bind:values step={10000} first="label" last="label" range />
</div>

<style>
    .slide {
        width: 100%;
        padding-top: 10px; 
    }
    :root {
        --range-slider: #d9ffee;
        --range-handle-inactive: #36bf4d;
        --range-handle:  #2CB948;
        --range-handle-focus:    #359B49;
        --range-pip:  #B2BEB5;
    }
</style>