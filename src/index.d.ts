/// <reference types="@rbxts/types" />

type Context<T> = T & {
	/**
	 * @hidden
	 * @deprecated
	 */
	readonly _nominal_Context: unique symbol;
};

interface Node {
	/**
	 * @hidden
	 * @deprecated
	 */
	readonly _nominal_Node: unique symbol;
}

interface ButtonWidgetHandle {
	clicked(): boolean;
}

interface CheckboxWidgetHandle extends ButtonWidgetHandle {
	checked(): boolean;
}

declare namespace Plasma {
	function _new(rootInstance: Instance): Node;
	export { _new as new };

	export function automaticSize(
		container: GuiObject,
		options?: { axis: Enum.AutomaticSize; maxSize: Vector2 },
	): void;

	export function create<T extends keyof CreatableInstances>(
		className: T,
		props: Partial<WritableInstanceProperties<CreatableInstances[T]>> & {
			[index: number]: Instance;
		} & Partial<{
				[index in InstanceEventNames<CreatableInstances[T]>]: (
					...args: InstanceEvents<CreatableInstances[T]>[index] extends RBXScriptSignal<
						(...args: infer U) => {}
					>
						? U
						: never
				) => void;
			}>,
	): Instances[T];

	export function createContext<T>(name: string): Context<T>;
	export function useContext<T>(context: Context<T>): T;
	export function provideContext<T>(context: Context<T>, value: T): void;
	export function useEffect(callback: () => (() => void) | void, ...dependencies: any[]): void;
	export function useState<T>(
		initalValue: T,
	): LuaTuple<[T, (newValue: T | ((currentValue: T) => T)) => void]>;
	export function useInstance<T extends Instance>(creator: () => T): T;
	export function start<T extends any[]>(rootNode: Node, callback: (...args: T) => void, ...args: T): void;
	export function scope<T extends any[]>(callback: (...args: T) => void, ...args: T): void;
	export function widget<T extends any[]>(callback: (...args: T) => void): (...args: T) => void;
	export function arrow(from: Vector3, to: Vector3, color?: Color3): void;
	export function arrow(point: Vector3, color?: Color3): void;
	export function arrow(cframe: CFrame, color?: Color3): void;
	export function arrow(part: BasePart, color?: Color3): void;
	export function arrow(fromPart: BasePart, toPart: BasePart, color?: Color3): void;
	export function blur(size: number): void;
	export function button(label: string): ButtonWidgetHandle;
	export function checkbox(
		label: string,
		options?: { checked?: boolean; disabled?: boolean },
	): CheckboxWidgetHandle;
	export function portal(targetInstance: Instance, children: () => void): void;
	export function row(children: () => void): void;
	export function row(options: { padding?: Vector2 }, children: () => void): void;
	export function window(title: string, children: () => void): void;
}

export = Plasma;
