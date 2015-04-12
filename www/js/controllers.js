angular
		.module('starter.controllers', [])

		.controller(
				'BMICnrl',
				function($scope) {
					$scope.isBMI = false;
					$scope.heightUnits = [ {
						label : 'Centimeters',
						text : 'cms'
					}, {
						label : 'Meters',
						text : 'm'
					}, {
						label : 'Feet',
						text : 'ft'
					} ];

					$scope.weightUnits = [ {
						label : 'Kilograms'
					}, {
						label : 'Pounds (lbs)'
					} ];

					$scope.initCompounding = function() {
						$scope.isCompounding = true;
					}

					$scope.calculateBMI = function() {
						if (!$scope.userInput.$valid) {
							alert("One or more fields are not valid. Please correct errors and try again");
							return;
						}
						if ($scope.txtHeight == 0) {
							alert("Please specify non zero height");
							return;
						}
						calculateBMIforScope($scope);
					}
					$scope.resetForm = function() {
						resetForm($scope);

					}
					$scope.hideBMI = function() {
						setIsBMI($scope, false);
					}
				});

/* Business Logic Functions start here */
function calculateBMIforScope($scope) {
	var scopeBMI;
	scopeBMI = calculateBMI($scope.txtHeight, $scope.txtWeight,
			$scope.heightUnitList.label, $scope.weightUnitList.label);
	if (scopeBMI >= 18.5 && scopeBMI <= 24.9) {
		$scope.goodBMI = true;
	} else {
		$scope.goodBMI = false;
	}
	$scope.BMI = scopeBMI.toFixed(2);
	if (scopeBMI > 0) {
		setIsBMI($scope, true);
	}
}

function calculateBMI(height, weight, heightUnit, weightUnit) {
	var BMI;
	var localHeight = height;
	var localWeight = weight;
	if (weightUnit == "Kilograms") {
		if (heightUnit == "Centimeters") {
			localHeight = convertHeightUnits(localHeight, "Centimeters",
					"Meters");
		}
		if (heightUnit == "Feet") {
			localHeight = convertHeightUnits(localHeight, "Feet", "Meters");
		}
		BMI = localWeight / (localHeight * localHeight);
	} else {
		if (heightUnit == "Centimeters") {
			localHeight = convertHeightUnits(localHeight, "Centimeters",
					"Inches");
		}
		if (heightUnit == "Meters") {
			localHeight = convertHeightUnits(localHeight, "Meters", "Inches");
		}
		if (heightUnit == "Feet") {
			localHeight = convertHeightUnits(localHeight, "Feet", "Inches");
		}
		BMI = (localWeight / (localHeight * localHeight)) * 703;
	}

	return BMI;
}

function convertHeightUnits(value, srcUnit, destUnit) {
	if (srcUnit == "Centimeters" && destUnit == "Meters") {
		return value / 100;
	}

	if (srcUnit == "Feet" && destUnit == "Meters") {
		return value * 0.3048;
	}

	if (srcUnit == "Centimeters" && destUnit == "Inches") {
		return value * 0.393701;
	}

	if (srcUnit == "Meters" && destUnit == "Inches") {
		return value * 39.3701;
	}

	if (srcUnit == "Feet" && destUnit == "Inches") {
		return value * 12;
	}
}

function setIsBMI($scope, value) {
	$scope.isBMI = value;
}

function resetForm($scope) {
	$scope.txtHeight = "";
	$scope.txtWeight = "";
	setIsBMI($scope, false);
	$scope.userInput.txtHeight.$dirty = false;
	$scope.userInput.txtWeight.$dirty = false;
}